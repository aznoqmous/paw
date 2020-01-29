import Route from './entity/route'

export default class SWrapper {

    constructor(sw, config) {
        this.config = Object.assign({
            title: config.name,
            cacheName: config.cacheName,
            assetsCacheName: `${config.cacheName}-assets`,
            offlinePage: config.offlinePage,
            staticPages: config.staticPages,
            strategy: config.strategy
        }, config)
        for (let key in this.config) this[key] = this.config[key]

        this.init(sw)
        this.bind()
    }

    init(sw) {
        this.sw = sw
        this.routes = []
        this.offlineRoutes = []
    }

    // addEventListeners
    bind() {
        this.bindInstall()
        this.bindActivate()
        this.bindFetch()

        this.sw.addEventListener('push', (e) => {
            e.waitUntil(this.notify(JSON.stringify(e.data), 'New push notification'))
        })

        this.sw.addEventListener('message', (e)=>{
            if(e.data.action == 'skipWaiting') this.sw.skipWaiting()
        })
    }
    bindActivate(){
        this.sw.addEventListener('activate', e => {
            // clean old cache
            e.waitUntil(caches.keys().then(keyList => {
                return Promise.all(keyList.map(key => {
                    if (
                        key !== this.cacheName &&
                        key !== this.assetsCacheName
                    ) {
                        return caches.delete(key)
                    }
                }))
            }))
            this.sw.skipWaiting()
            this.sw.clients.claim()
        })
    }
    bindInstall(){
        this.sw.addEventListener('install', e => {
            e.waitUntil(
                // download static resources
                caches.open(this.cacheName).then(cache => {
                    return cache.addAll(this.staticPages)
                })
            )
        })
    }
    bindFetch(){
        this.sw.addEventListener('fetch', e => {
            e.respondWith(this.handleRequest(e))
        })
    }

    // REQUESTS HANDLING
    handleRequest(fetchEvent){
        return this.prepareRequest(fetchEvent)
        .then(()=>{
            let matches = this.routeMatch(fetchEvent.request)
            if (matches.length) {
                let route = matches[0]
                return this.controllerStrategy(route, fetchEvent)
            }
            else if (fetchEvent.request.mode == 'navigate') {
                return this.defaultFetchStrategy(fetchEvent)
            }
            else {
                // assets
                return this.defaultAssetStrategy(fetchEvent)
            }
        })
    }
    prepareRequest(fetchEvent){
        return Promise.all([
            this.getPostData(fetchEvent)
        ])
    }
    getPostData(fetchEvent){
        let request = fetchEvent.request.clone()
        return new Promise((res, rej)=>{
            let headers = {}
            let hs = [...request.headers]
            hs.map(h => { headers[h[0]] = h[1] })
            if(headers['content-type'] == 'application/x-www-form-urlencoded') request.formData().then((data)=>{
                fetchEvent.post = [...data]
                res(fetchEvent.post)
            })
            else res(false)
        })
    }

    // CACHE
    store(cacheName, url, response) {
        cacheName = (cacheName) ? cacheName : this.cacheName
        let clone = response.clone()
        caches.open(cacheName)
            .then(cache => {
                cache.put(url, clone)
            })
    }
    clearOldCaches() {
        return caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== this.cacheName) {
                    return caches.delete(key)
                }
            }))
        })
    }
    clearCache(cacheName=null) {
        cacheName = (cacheName) ? cacheName : this.cacheName
        return caches.delete(cacheName)
    }


    // STRATEGY
    controllerStrategy(route, e){
        let response = this.controller(route, e)

        if (response && response.constructor.name == 'Response') return response
        else if (response) return new Response(response, {status: 200, headers: route.headers})
        else if (route.strategy) return this.fetchStrategy(e, route.strategy)
        else return this.defaultFetchStrategy(e) // if no response handle basic response
    }
    defaultFetchStrategy(e) {
        return this.fetchStrategy(e, this.strategy)
    }
    defaultAssetStrategy(e){
        return this.fetchStrategy(e, 'cache', this.assetsCacheName)
    }

    fetchStrategy(e, strategy, cacheName=null){
        if (strategy == 'cache') return this.strategyCache(e, cacheName)
        else if (strategy == 'network') return this.strategyNetwork(e, cacheName)
        else return this.strategyCache(e, cacheName)
    }

    strategyNetwork(e, cacheName=null) {
        cacheName = (cacheName) ? cacheName : this.cacheName
        return fetch(e.request)
            .then(response => {
                if (response.status == 200) {
                    this.store(cacheName, e.request.url, response)
                }
                return response;
            })
            .catch(() => {
                return caches.open(cacheName)
                    .then(cache => {
                        if (cache.match(e.request)) return cache.match(e.request)
                        return cache.match(this.offlinePage)
                    })
            })

    }

    strategyCache(e, cacheName=null) {
        cacheName = (cacheName) ? cacheName : this.cacheName
        return caches.open(cacheName)
            .then(cache => {
                return cache.match(e.request).then(response => {
                    return response || fetch(e.request)
                        .then(response => {
                            if (response.status == 200) {
                                this.store(cacheName, e.request.url, response)
                            }
                            return response;
                        })
                })
            })

    }


    // ROUTES
    // register routes
    route(path, callback=null, config={}) {
        let route = new Route(path, callback, config)
        this.routes.push(route)
        return route
    }
    json(path, callback, config = {}){
        return this.route(path, ()=>{ return JSON.stringify( callback() ) }, Object.assign(config, {json: true}))
    }

    // register offline routes
    offline(path, callback, config = {}) {
        return this.route(path, callback, Object.assign(config, {offline: true}))
    }

    // register online routes
    online(path, callback, config = {}) {
        return this.route(path, callback, Object.assign(config, {online: true}))
    }

    redirect(from, to, config={}){
        return this.route(from, ()=>{ return this.redirectResponse(to) }, config)
    }
    redirectResponse(path) {
        return Response.redirect(path, 302);
    }

    routeMatch(request) {
        let path = (new URL(request.url)).pathname
        let matches = this.routes.filter((route) => {
            if (!route.methods.toLowerCase().match(request.method.toLowerCase())) return false; // methods dont match
            if (path != route.path) return false; // path doesnt match
            if (route.offline && navigator.onLine) return false; // dont serve offline routes if online
            if (route.online && !navigator.onLine) return false; // dont serve online routes if offline
            return true;
        })
        return matches
    }

    post(url, data){
        return fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    controller(route, e) {
        if(!route.callback) return false
        let res = route.callback(e)
        return (res) ? res : false;
    }

    notify(body, title = false) {
        if (Notification.permission == 'denied' || !Notification.permission) return false;
        title = `${this.title} ${title ? '-' + title : ''}`
        let options = {
            body: `${body}`,
            icon: (this.config.icons.length) ? this.config.icons[0] : '',
            badge: this.config.badge
        }
        return this.sw.registration.showNotification(title, options)
    }

}
