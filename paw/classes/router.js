import Route from './route'

export default class Router {

    constructor(routes = []) {
        this.routes = routes
    }

    routeMatch(fetchEvent) {

        let path = decodeURI((new URL(fetchEvent.request.url)).pathname)

        let matches = this.routes.filter((route) => {
            if (!route.methods.toUpperCase().match(fetchEvent.request.method)) return false; // methods dont match
            if (route.data && !fetchEvent.datas) return false;
            if (route.offline && navigator.onLine) return false; // dont serve offline routes if online
            if (route.online && !navigator.onLine) return false; // dont serve online routes if offline
            if (!path.match(route.regPath)) return false;
            return true;
        })
        return matches
    }

    routeMatchPath(path) {
        path = decodeURI(path)
        let matches = this.routes.filter((route) => {
            if (!path.match(route.regPath)) return false;
            return true;
        })
        return matches
    }

    resolve(fetchEvent) {
        return new Promise((res, rej) => {
            let routes = this.routeMatch(fetchEvent)
            let response = null
            let finalRoute = null

            routes.map(route => {
                if (response) return false
                response = this.controller(route, fetchEvent)
                finalRoute = route
            })

            if (response && response.constructor.name == 'Promise') response.then(resp => {
                if (resp && resp.constructor.name == 'Response') res(resp)
                else if (resp) res(new Response(resp, {status: 200, headers: finalRoute.headers}))
            })
                .catch(err => {
                    console.log(err)
                })

            else if (response && response.constructor.name == 'Response') res(response)
            else if (response) res(new Response(response, {status: 200, headers: finalRoute.headers}))
            else rej(finalRoute)
        })
    }

    controller(route, e) {
        if (!route.callback) return false
        let path = decodeURI((new URL(e.request.url)).pathname)
        let capture = path.match(route.regPath)
        let res = null

        if (capture) {
            let values = []
            for (let key in capture.groups) values.push(capture.groups[key])
            res = route.callback(e, ...values)
        } else {
            res = route.callback(e)
        }

        return (res) ? res : false;
    }

    // register routes
    route(path, callback = null, config = {}) {
        if (path.map) return path.map(p => this.route(p, callback, config))
        let route = new Route(path, callback, config)
        this.routes.push(route)
        return route
    }

    json(path, callback, config = {}) {
        return this.route(path, () => {
            if(callback.constructor.name == 'Promise') return callback().then(res => { return JSON.stringify(res)})
            else return JSON.stringify(callback())
        }, Object.assign(config, {type: 'json'}))
    }

    html(path, callback, config = {}) {
        return this.route(path, callback, Object.assign(config, {type: 'html'}))
    }

    // register offline routes
    offline(path, callback, config = {}) {
        return this.route(path, callback, Object.assign(config, {offline: true}))
    }

    // register online routes
    online(path, callback, config = {}) {
        return this.route(path, callback, Object.assign(config, {online: true}))
    }

    // match only when post/get data is sent
    data(path, callback, config = {}) {
        return this.route(path, callback, Object.assign(config, {data: true}))
    }

    // match only when post data is sent
    post(path, callback, config = {}) {
        return this.route(path, callback, Object.assign(config, {methods: 'POST', data: true}))
    }

    // match only when get data is sent
    get(path, callback, config = {}) {
        return this.route(path, callback, Object.assign(config, {methods: 'GET', data: true}))
    }

    redirect(from, to, config = {}) {
        return this.route(from, () => {
            return this.redirectResponse(to)
        }, config)
    }

    redirectResponse(path) {
        return Response.redirect(path, 302);
    }

    setStrategyNetwork(routes) {
        return this.setStrategy('network', routes)
    }

    setStrategyCache(routes) {
        return this.setStrategy('cache', routes)
    }

    setStrategy(strategy, routes) {
        if (typeof (routes) == 'string') routes = [routes]
        routes.map((path) => {
            let matches = this.routeMatchPath(path)
            if (matches) matches.map(route => {
                route.setStrategy(strategy)
            })
            else this.route(path).setStrategy(strategy)
        })
    }

    // REQUESTS HANDLING
    handleRequest(fetchEvent) {
        return this.prepareRequest(fetchEvent)
            .then(() => {
                let matches = this.routeMatch(fetchEvent)
                if (matches.length) {
                    return this.resolve(fetchEvent)
                        .then(response => {
                            return {response: response}
                        })
                        .catch(finalRoute => {
                            return {finalRoute: finalRoute}
                        })
                }
                else return fetchEvent
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

}
