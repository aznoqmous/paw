import Route from './entity/route'

export default class SWrapper {

  constructor(sw, config){
    this.config = Object.assign({
      title: config.name,
      cacheName: config.cacheName,
      offlinePage: config.offline, // offline page : takes first static cached request by default
      strategy: config.strategy
    }, config)
    this.staticPages = this.config.staticPages

    for(let key in this.config) this[key] = this.config[key]

    this.init(sw)
    this.bind()
  }
  init(sw){
    this.sw = sw
    this.routes = []
    this.offlineRoutes = []
  }

  bind(){

    this.sw.addEventListener('install', e =>{
      e.waitUntil(
        // download static resources
        caches.open(this.cacheName).then(cache => {
          return cache.addAll(this.staticPages)
        })
      )
    })

    this.sw.addEventListener('activate', e => {
      // clean old cache
      e.waitUntil( caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
          if(key !== this.cacheName) {
            return caches.delete(key)
          }
        }))
      }) )
      this.sw.skipWaiting()
      this.sw.clients.claim()

    })

    this.sw.addEventListener('fetch', e =>{

      let matches = this.routeMatch(e.request)
      if(matches.length) {
        let response = this.controller(matches[0])
        if(response) e.respondWith(response)
        else this.defaultFetchStrategy(e)
      }
      else if(e.request.mode == 'navigate'){
        this.defaultFetchStrategy(e)
      }

    })

    this.sw.addEventListener('push', (e)=>{
      e.waitUntil(this.notify(JSON.stringify(e.data), 'New push notification'))
    })

  }

// CACHE
  store(url, response){
    let clone = response.clone()
    caches.open(this.cacheName)
    .then( cache => { cache.put(url, clone) })
  }
  clearOldCaches(){
    return caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if(key !== this.cacheName) {
          return caches.delete(key)
        }
      }))
    })
  }
  clearCache(){
    return caches.delete(this.cacheName)
  }


// STRATEGY
defaultFetchStrategy(e){
  if(this.strategy == 'cache') return this.strategyCache(e)
  if(this.strategy == 'network') return this.strategyNetwork(e)
}
  strategyNetwork(e){
    e.respondWith(
      fetch(e.request)
      .then(response => {
        if(response.status == 200){
          this.store(e.request.url, response)
        }
        return response;
      })
      .catch(()=>{
        return caches.open(this.cacheName)
        .then( cache => {
          if(cache.match(e.request)) return cache.match(e.request)
          return cache.match(this.offlinePage)
        })
      })
    )
  }
  strategyCache(e){
    e.respondWith(
      caches.open(this.cacheName)
      .then( cache => {
        if(cache.match(e.request))

        // to do : load new content
        fetch(e.request)
        .then(response => {
          if(response.status == 200){
            this.store(e.request.url, response)
          }
          return response;
        })

        return cache.match(e.request)
      })

    )
  }


// ROUTES
  // register routes
  route(path, callback, config){
    this.routes.push( new Route(path, callback, config) )
  }
  // register offline routes
  offline(path, callback, config={}){
    this.routes.push( new Route(path, callback, Object.assign(config, { offline: true }) )
  }
  // register online routes
  online(path, callback, config={}){
    this.routes.push( new Route(path, callback, Object.assign(config, { online: true }) )
  }
  routeMatch(request){
    let path = (new URL(request.url)).pathname
    let matches = this.routes.filter((route)=>{
      if(!route.methods.toLowerCase().match(request.method.toLowerCase())) return false; // methods dont match
      if(path != route.path) return false; // path doesnt match
      if(route.offline && navigator.onLine) return false; // dont serve offline routes if online
      if(route.online && !navigator.onLine) return false; // dont serve online routes if offline
      return true;
    })
    return matches
  }
  controller(route){
    let content = route.callback()
    if(content) return new Response(content, { status: 200, headers: route.headers })
    else return false
  }

  notify(body, title=false){
    if(Notification.permission == 'denied' || !Notification.permission) return false;
    title = `${this.title} ${title ? '-' + title : ''}`
    let options = {
      body: `${body}`,
      icon: (this.config.icons.length) ? this.config.icons[0] : '',
      badge: this.config.badge
    }
    return this.sw.registration.showNotification(title, options)
  }

}
