import Route from './route'
import Router from './router'
import Deferrer from './deferrer'
import Crawler from './crawler'

export default class SWrapper {

    constructor(sw, config) {

        this.config = Object.assign({
            assetsCacheName: `${config.cacheName}-assets`,
            deferrerName: `paw-deferred`,
            staticPages: ['/'],
        }, config)
        for (let key in this.config) this[key] = this.config[key]

        this.assetsCacheName += `-${Date.now()}`
        this.cacheName += `-${Date.now()}`

        this.init(sw)
        this.bind()

    }

    init(sw) {
        this.sw = sw
        this.deferrer = new Deferrer()
        this.router = new Router()

        this.router.setStrategyNetwork([
            '/register.js',
            '/sw.js'
        ])

    }

    // EVENTS
    bind() {
        this.bindInstall()
        this.bindActivate()
        this.bindFetch()
        this.bindSync()
        this.bindMessages()
        this.bindPushNotifications()
    }

    bindInstall() {

        this.sw.addEventListener('install', e => {
            console.log('sw: install')
            e.waitUntil(
                this.addPagesToCache(this.staticPages)
                    .then(()=>{
                        console.log('install done, waiting...')
                    })
            )
        })
    }

    bindActivate() {
        this.sw.addEventListener('activate', e => {
            console.log('sw: activate')
            e.waitUntil(
                this.clearOldCaches()
            )
            this.sw.clients.claim()
        })
    }

    bindFetch() {
        this.sw.addEventListener('fetch', e => {
            e.respondWith(
                this.router.handleRequest(e)
                    .then((res)=>{
                        if (res.response) return res.response
                        if (res.finalRoute && res.finalRoute.strategy) return this.fetchStrategy(e, res.finalRoute.strategy)
                        if (e.request.mode == 'navigate')  return this.defaultFetchStrategy(e)
                        if (e.request.destination.length) return this.defaultAssetStrategy(e)
                        return this.defaultFetchStrategy(e)
                    })
            )
        })
    }

    bindSync() {
        this.sw.addEventListener('sync', (e) => {
            this.notify(e)
        })
    }

    bindMessages(){
        this.sw.addEventListener('message', (e) => {

            console.log('message', e.data)

            if(e.data == 'skipWaiting') {
                this.sw.skipWaiting()
                    .then(res => {console.log('skipwaiting success', res)})
                    .catch(err => { console.log('skipwaiting error', err) })
                return true
            }

            if(this.registerMessageChannel(e)) return false;

            let port = false

            if (e.ports.length) {
                port = e.ports[0]
            }

            if (e.data.sw){

                if(port) return this.sw[e.data.sw]()
                    .then(res => port.postMessage(res))
                    .catch(err => port.postMessage(err))

                return this.sw[e.data.sw]().then(res => {console.log('skipWaiting end')})

            }

            if (e.data.action) {
                if(e.data.action == 'skipWaiting') return this.sw.skipWaiting()
                console.log('unhandled e.data.action', e.data.action)
            }

            if(e.data.do) {
                let options = (e.data.options)? e.data.options : [];
                if(port) return this[e.data.do](...options)
                    .then((res)=>{port.postMessage(res)})
                    .catch((err)=>{port.postMessage(err)})
                return this[e.data.do](...options)
            }

            if (e.data.sync) {
                if(port) return this.sync(e.data.sync, e.data.config)
                    .then((res)=>{port.postMessage(res)})
                    .catch((err)=>{port.postMessage(err)})
                return this.sync(e.data.sync, e.data.config)
            }

            if (e.data.deferred) {
                if(port) return this.deferred(e.data.deferred)
                    .then((res)=>{port.postMessage(res)})
                    .catch((err)=>{port.postMessage(err)})

                return this.deferred(e.data.deferred)
            }

            if(port) port.postMessage(e.data)

        })
    }

    bindPushNotifications(){
        this.sw.addEventListener('push', (e) => {
            e.waitUntil(this.notify(JSON.stringify(e.data), 'New push notification'))
        })
    }


    /// CACHE
    storeResponse(cacheName, url, response) {
        cacheName = (cacheName) ? cacheName : this.cacheName
        let clone = response.clone()
        caches.open(cacheName)
        .then(cache => {
            cache.put(url, clone)
        })
    }

    clearOldCaches() {
        if(this.debug) console.log('clearing old caches...')
        return caches.keys().then(keyList => {
            return Promise.allSettled(keyList.map(key => {
                if (![this.cacheName, this.assetsCacheName].includes(key)) {
                    return caches.delete(key)
                }
            }))
                .then(()=>{
                    if(this.debug) console.log('clearing old cache end.')
                })
        })
    }

    clearCache(cacheName = null) {
        cacheName = (cacheName) ? cacheName : this.cacheName
        return caches.delete(cacheName)
    }

    // @addPageToCache -> performance mode
    addPagesToCache(paths){
        if(this.debug) console.log('adding pages to cache...', paths)
        let crawler = new Crawler(this.sw.location.origin)
        return Promise.allSettled(paths.map(path => {
            return Promise.allSettled([
                this.addToCache(path),
                crawler.crawlPageAssets(path)
            ])
        }))
        .then(()=>{
            return this.addToAssetsCache(Object.keys(crawler.assets))
        })
        .then(res => {
            if(this.debug) console.log('adding pages to cache end.')
        })
    }

    // Crawl page path for its assets, then add both to cache
    addPageToCache(path){
        if(this.debug) console.log('adding page to cache...', path)
        let crawler = new Crawler(this.sw.location.origin)
        return Promise.allSettled([
            this.addToCache(path),
            crawler.crawlPageAssets(path)
            .then(() => {
                return this.addToAssetsCache(Object.keys(crawler.assets))
            })
        ])
        .then(res => {
            if(this.debug) console.log('adding page to cache end.')
        })
    }

    addToCache(paths, cacheName = null) {
        cacheName = (cacheName) ? cacheName : this.cacheName
        if(!paths.map) paths = [paths]
        return caches.open(cacheName).then(cache => {
            return Promise.allSettled(paths.map(path => {
                return cache.add(path)
                .catch(err => {console.error(path, 'add to cache failed')})
            }))
        })
        .catch(err => {
            console.err('add to cache failed', err)
        })
    }

    addToAssetsCache(paths){
        return this.addToCache(paths, this.assetsCacheName)

    }


    /// REQUESTS STRATEGY
    defaultFetchStrategy(e) {
        return this.fetchStrategy(e, this.strategy)
    }

    defaultAssetStrategy(e) {
        return this.fetchStrategy(e, 'cache', this.assetsCacheName)
    }

    fetchStrategy(e, strategy, cacheName = null) {
        if (strategy == 'cache') return this.strategyCache(e, cacheName)
        else if (strategy == 'network') return this.strategyNetwork(e, cacheName)
        else return this.strategyFastest(e, cacheName)
    }

    strategyNetwork(e, cacheName = null) {
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
                if (this.cacheMatch(cache, e)) return this.cacheMatch(cache, e)
                return cache.match(this.offlinePage)
            })
        })
    }

    strategyCache(e, cacheName = null) {
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

    strategyFastest(e, cacheName = null) {
        return Promise.race([
            this.strategyCache(e, cacheName),
            this.strategyNetwork(e, cacheName)
        ])
        .then(res => res)
    }

    cacheMatch(cache, fetchEvent) {
        return cache.match(fetchEvent.request.url)
    }


    /// REQUEST DEFERRER
    defer(key, fetchEvent) {
        return this.deferrer.save(key, fetchEvent)
    }

    deferred(key) {
        return this.deferrer.all(key)
    }

    // sync deferred requests
    sync(key, config={}) {
        return this.deferrer.load(key, config)
    }


    /// NOTIFICATIONS - MESSAGES
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

    registerMessageChannel(e){
        if (e.data == 'message') {
            this.messagePort = e.ports[0]
            return e.ports[0]
        }
        return false
    }

    message(message) {
        if (!this.messagePort) {
            setTimeout(() => {
                // retry until it works
                this.message(message)
            }, 1000)
        }
        else this.messagePort.postMessage(message)
    }

}
