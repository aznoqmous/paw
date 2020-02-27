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

    // addEventListeners
    bind() {
        this.bindInstall()
        this.bindActivate()
        this.bindFetch()
        this.bindSync()

        this.sw.addEventListener('push', (e) => {
            e.waitUntil(this.notify(JSON.stringify(e.data), 'New push notification'))
        })

        this.sw.addEventListener('message', (e) => {

            if(this.registerMessageChannel(e)) return false;

            let port = false
            if (e.ports.length) {
                port = e.ports[0]
            }

            if (e.data.action) {
                if(port) return port.postMessage(this[e.data.action]())
                return this.sw[e.data.action]()
            }
            if(e.data.do) {
                let options = (e.data.options)? e.data.options : [];
                if(port) return this[e.data.do](...options)
                .then((res)=>{port.postMessage(res)})
                .catch((err)=>{port.postMessage(err)})
                return this[e.data.do](...options)
            }

            if (e.data.sync) {
                if (typeof e.data.sync == 'object') return this.sync(...e.data.sync)
                else return this.sync(e.data.sync)
            }

            if(port) port.postMessage(e.data)
        })
    }

    bindActivate() {
        this.sw.addEventListener('activate', e => {
            e.waitUntil(
                this.clearOldCaches()
            )
            this.sw.skipWaiting()
            this.sw.clients.claim()
        })
    }

    bindInstall() {
        this.sw.addEventListener('install', e => {
            e.waitUntil(
                this.addPagesToCache(this.staticPages)
                .then(()=>{console.log('sw install complete')})
            )
        })
    }

    bindFetch() {
        this.sw.addEventListener('fetch', e => {
            e.respondWith(this.handleRequest(e))
        })
    }

    bindSync() {
        this.sw.addEventListener('sync', (e) => {
            this.notify(e)
        })
    }

    // REQUESTS HANDLING
    handleRequest(fetchEvent) {
        return this.prepareRequest(fetchEvent)
        .then(() => {
            let matches = this.router.routeMatch(fetchEvent)

            if (matches.length) {
                return this.router.resolve(fetchEvent)
                .then(res => {
                    return res
                })
                .catch(finalRoute => {
                    if (finalRoute.strategy) return this.fetchStrategy(fetchEvent, finalRoute.strategy)
                    else return this.defaultFetchStrategy(fetchEvent) // if no response handle basic response
                })
            }
            else if (fetchEvent.request.mode == 'navigate') {
                return this.defaultFetchStrategy(fetchEvent)
            }
            else if (fetchEvent.request.destination.length){
                return this.defaultAssetStrategy(fetchEvent)
            }

            return this.defaultFetchStrategy(fetchEvent)
        })
    }

    prepareRequest(fetchEvent) {
        fetchEvent.data = {}
        return Promise.allSettled([
            this.getPostData(fetchEvent),
            this.getURLParamsData(fetchEvent)
        ])
    }

    getPostData(fetchEvent) {
        let request = fetchEvent.request.clone()
        return new Promise((res, rej) => {
            let requestData = this.fetchRequestData(request)
            if (requestData) requestData.then((data) => {

                if (typeof data[Symbol.iterator] === 'function') {
                    let objData = {}
                    data.forEach((value, key) => {
                        objData[key] = value
                    });
                    data = objData
                }

                if (Object.entries(data).length) {
                    if (!fetchEvent.data) fetchEvent.data = {}
                    if (!fetchEvent.datas) fetchEvent.datas = {}
                    fetchEvent.data.post = data
                    fetchEvent.datas = Object.assign(fetchEvent.datas, data)
                }

                res()
            })
            else rej()
        })
    }



    fetchRequestData(request) {
        let headers = {}
        let hs = [...request.headers]

        hs.map(h => {
            headers[h[0]] = h[1]
        })


        if (
            /application\/x\-www\-form\-urlencoded/.test( headers['content-type'] ) ||
            /multipart\/form\-data/.test( headers['content-type'] )
        ) return request.formData()

        if (
            /application\/json/.test( headers['content-type'] )
        ) return request.json()

        if (
            /text\/html/.test( headers['content-type'] )
        ) return request.text()

        return false;
    }

    getURLParamsData(fetchEvent) {
        return new Promise((res, rej) => {
            let objData = {}
            let data = new URL(fetchEvent.request.url).searchParams

            if (typeof data[Symbol.iterator] === 'function') {
                let objData = {}
                data.forEach((value, key) => {
                    objData[key] = value
                });
                data = objData
            }
            if (Object.entries(data).length) {
                if (!fetchEvent.data) fetchEvent.data = {}
                if (!fetchEvent.datas) fetchEvent.datas = {}
                fetchEvent.data.get = data
                fetchEvent.datas = Object.assign(fetchEvent.datas, data)
            }

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
                if (![this.cacheName, this.assetsCacheName].includes(key)) {
                    return caches.delete(key)
                }
            }))
        })
    }

    clearCache(cacheName = null) {
        cacheName = (cacheName) ? cacheName : this.cacheName
        return caches.delete(cacheName)
    }

    // @addPageToCache
    addPagesToCache(paths){
        let crawler = new Crawler(this.sw.location.origin)
        return Promise.allSettled(paths.map(path => {
            return Promise.allSettled([
                this.addToCache(path),
                crawler.crawlPageAssets(path)
            ])
        }))
        .then(()=>{
            console.log(crawler.assets)
            return this.addToAssetsCache(Object.keys(crawler.assets))
        })
    }

    // Crawl page path for its assets, then add both to cache
    addPageToCache(path){
        let crawler = new Crawler(this.sw.location.origin)
        return Promise.allSettled([
            this.addToCache(path),
            crawler.crawlPageAssets(path)
            .then(() => {
                this.addToAssetsCache(Object.keys(crawler.assets))
            })
        ])
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

    // STRATEGY
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

    defer(key, fetchEvent) {
        return this.deferrer.save(key, fetchEvent)
    }

    sync(key, url = null) {
        return this.deferrer.load(key, url)
    }

    deferred(key) {
        return this.deferrer.all(key)
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
