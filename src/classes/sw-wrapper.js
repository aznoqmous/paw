import Route from './route'
import Deferrer from './deferrer'

export default class SWrapper {

    constructor(sw, config) {
        console.log(this)
        this.config = Object.assign({
            title: config.name,
            cacheName: config.cacheName,
            assetsCacheName: `${config.cacheName}-assets`,
            deferrerName: `paw-deferred`,
            offlinePage: config.offlinePage,
            staticPages: config.staticPages,
            strategy: config.strategy
        }, config)
        for (let key in this.config) this[key] = this.config[key]
        this.deferrer = new Deferrer({
            name: this.deferrerName
        })
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

        this.bindSync()

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
    bindSync(){
        this.sw.addEventListener('sync', (e)=>{
            console.log('sync', e)
            this.notify(e)
        })
    }

    // REQUESTS HANDLING
    handleRequest(fetchEvent){
        return this.prepareRequest(fetchEvent)
        .then(()=>{
            let matches = this.routeMatch(fetchEvent.request)
            if (matches.length) {
                return this.controllerStrategy(matches, fetchEvent)
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
        fetchEvent.data = {}
        return Promise.all([
            this.getPostData(fetchEvent),
            this.getURLParamsData(fetchEvent)
        ])
    }
    getPostData(fetchEvent){
        let request = fetchEvent.request.clone()
        return new Promise((res, rej)=>{
            let requestData = this.fetchRequestData(request)
            if(requestData) requestData.then((data)=>{

                if(typeof data[Symbol.iterator] === 'function') {
                    let objData = {}
                    data.forEach((value, key) => { objData[key] = value });
                    data = objData
                }
                fetchEvent.post = data
                fetchEvent.data = Object.assign(fetchEvent.data, fetchEvent.post)

                res(fetchEvent.data)
            })
            else res(false)
        })
    }
    fetchRequestData(request){
        let headers = {}
        let hs = [...request.headers]
        hs.map(h => { headers[h[0]] = h[1] })
        if(headers['content-type'] == 'application/x-www-form-urlencoded')
        return request.formData()
        else if(headers['content-type'] == 'application/json')
        return request.json()
        else if(headers['content-type'] == 'text/html')
        return request.text()
        else return false;
    }

    getURLParamsData(fetchEvent){
        return new Promise((res, rej)=>{
            let objData = {}
            let data = new URL(fetchEvent.request.url).searchParams

            if(typeof data[Symbol.iterator] === 'function') {
                let objData = {}
                data.forEach((value, key) => { objData[key] = value });
                data = objData
            }

            fetchEvent.get = data
            fetchEvent.data = Object.assign(fetchEvent.data, fetchEvent.get)

            res()
        })
    }


    // CACHE
    storeResponse(cacheName, url, response) {
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
    controllerStrategy(matchingRoutes, e){
        let response = null
        let finalRoute = null
        matchingRoutes.map(route => {
            if(response) return false
            response = this.controller(route, e)
            finalRoute = route
        })
        if (response && response.constructor.name == 'Promise') return response.then(res => {
            return new Response(res, {status: 200, headers: finalRoute.headers})
        })
        else if (response && response.constructor.name == 'Response') return response
        else if (response) return new Response(response, {status: 200, headers: finalRoute.headers})
        else if (finalRoute.strategy) return this.fetchStrategy(e, finalRoute.strategy)
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
                this.storeResponse(cacheName, e.request.url, response)
            }
            return response;
        })
        .catch(() => {
            return caches.open(cacheName)
            .then(cache => {
                if (this.cacheMatch(cache, e)) return this.cacheMatch(e)
                return cache.match(this.offlinePage)
            })
        })

    }
    strategyCache(e, cacheName=null) {
        cacheName = (cacheName) ? cacheName : this.cacheName
        return caches.open(cacheName)
        .then(cache => {
            return this.cacheMatch(cache, e).then(response => {
                return response || fetch(e.request)
                .then(response => {
                    if (response.status == 200) {
                        this.storeResponse(cacheName, e.request.url, response)
                    }
                    return response;
                })
            })
        })

    }
    cacheMatch(cache, fetchEvent){
        return cache.match(fetchEvent.request.url)
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
            if (route.offline && navigator.onLine) return false; // dont serve offline routes if online
            if (route.online && !navigator.onLine) return false; // dont serve online routes if offline
            if(!path.match(route.regPath)) return false;
            return true;
        })
        return matches
    }

    controller(route, e) {
        if(!route.callback) return false

        let capture = (new URL(e.request.url)).pathname.match(route.regPath)
        let res = null

        if(capture){
            let values = []
            for (let key in capture.groups ) values.push(capture.groups[key])
            res = route.callback(e, ...values)
        }
        else {
            res = route.callback(e)
        }

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

    // deferer
    defer(key, fetchEvent){
        return this.deferrer.save(key, fetchEvent)
    }
    sync(key, url=null){
        return this.deferrer.load(key, url)
    }
    deferred(){
        return this.deferrer.all('index')
    }

}
