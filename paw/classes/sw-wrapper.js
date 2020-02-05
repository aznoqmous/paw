import Route from './route'
import Router from './router'
import Deferrer from './deferrer'

export default class SWrapper {

    constructor(sw, config) {
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

        this.init(sw)
        this.bind()
    }

    init(sw) {
        this.sw = sw
        this.routes = []
        this.offlineRoutes = []
        this.deferrer = new Deferrer()
        this.router = new Router()
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
            let matches = this.router.routeMatch(fetchEvent.request)
            if (matches.length) {
                return this.router.resolve(fetchEvent)
                .then(res => { return res })
                .catch(finalRoute => {
                    if (finalRoute.strategy) return this.fetchStrategy(fetchEvent, finalRoute.strategy)
                    else return this.defaultFetchStrategy(fetchEvent) // if no response handle basic response
                })
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
