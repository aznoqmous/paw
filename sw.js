/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./paw/classes/IDB.js":
/*!****************************!*\
  !*** ./paw/classes/IDB.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return IDB; });\nclass IDB {\r\n    constructor(config){\r\n        config = Object.assign({\r\n            name: 'idb',\r\n            tableName: 'data',\r\n            built: false\r\n        }, config)\r\n        for(let key in config) this[key] = config[key]\r\n        this.build().then(()=>{this.built = true})\r\n    }\r\n\r\n    build(){\r\n        return new Promise((res, rej)=>{\r\n            let connection = indexedDB.open(this.name, 1)\r\n\r\n            connection.onsuccess = (e) => {\r\n                this.db = e.target.result\r\n                res(this.db)\r\n            }\r\n\r\n            connection.onerror = (err) => {\r\n                console.error('indexedDB error', err)\r\n                rej()\r\n            }\r\n\r\n            connection.onupgradeneeded = (e)=>{\r\n                this.db = e.target.result\r\n                this.table = this.db.createObjectStore(this.tableName, {\r\n                    autoIncrement: true\r\n                })\r\n                this.table.createIndex('name', 'name', { unique: false })\r\n                res(this.db)\r\n            }\r\n        })\r\n    }\r\n    getTransaction(){\r\n        return this.db.transaction(this.tableName, 'readwrite').objectStore(this.tableName)\r\n    }\r\n\r\n    save(data){\r\n        return new Promise(res => {\r\n            if(!this.built) return this.build().then(()=>{this.save(data)})\r\n\r\n            let request = this.getTransaction().add(data)\r\n            request.onsuccess = (e)=>{ res(data) }\r\n            request.onerror = (err)=>{ rej(err) }\r\n        })\r\n    }\r\n\r\n    get(key=null){\r\n        let elements = []\r\n        return new Promise(res => {\r\n            let request = this.getTransaction().openCursor()\r\n            request.onsuccess = (e)=>{\r\n                let element = e.target.result\r\n                if(element) {\r\n                    elements.push(this.clone(element))\r\n                    element.continue()\r\n                }\r\n                else res(elements)\r\n            }\r\n            request.onerror = (err)=>{ console.error(err); rej(err) }\r\n        })\r\n    }\r\n    delete(key){\r\n        return new Promise(res => {\r\n            let request = this.getTransaction().delete(key)\r\n            request.onsuccess = ()=>{ res(key) }\r\n            request.onerror = (err)=>{ console.error(err); rej(err) }\r\n        })\r\n    }\r\n\r\n    clone(obj){\r\n        let objCopy = {}\r\n        for(let key in obj){\r\n            objCopy[key] = obj[key]\r\n        }\r\n        return objCopy;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./paw/classes/IDB.js?");

/***/ }),

/***/ "./paw/classes/crawler.js":
/*!********************************!*\
  !*** ./paw/classes/crawler.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Crawler; });\nclass Crawler {\r\n\r\n    constructor(host, config){\r\n        config = Object.assign({\r\n            host: host,\r\n            url: null,\r\n            pages: [],\r\n            assets: []\r\n        }, config)\r\n        for(let key in config) this[key] = config[key]\r\n    }\r\n\r\n    crawl(url){\r\n        return this.fetch(url)\r\n        .then((text)=>{\r\n            let links = this.extractLinks(text)\r\n            this.newAssets(links.assets)\r\n            return Promise.all(this.newPages(links.pages).map(a => {\r\n                return this.crawl(a)\r\n            }))\r\n            .then(()=>{ return this.pages })\r\n        })\r\n    }\r\n\r\n    fetch(url){\r\n        return new Promise((res, rej) => {\r\n            fetch(url)\r\n            .then(res => res.text())\r\n            .then(text => { res(text) })\r\n            .catch(err => { rej(err) })\r\n        })\r\n    }\r\n\r\n    extractLinks(text){\r\n        let pages = text.match(/\\<a[^\\>]*?href\\=(\\\"|\\')[^\\\"\\']*?(\\\"|\\')/g)\r\n        let lhrefs = text.match(/\\<link[^\\>]*?href\\=(\\\"|\\')[^\\\"\\']*?(\\\"|\\')/g)\r\n        let srcs = text.match(/src\\=(\\\"|\\')[^\\\"\\']*?(\\\"|\\')/g)\r\n\r\n        pages = (pages) ? pages : []\r\n        lhrefs = (lhrefs) ? lhrefs : []\r\n        srcs = (srcs) ? srcs : []\r\n        let assets = lhrefs.concat(srcs)\r\n\r\n        return {\r\n            pages: this.getLinksFromMatches(pages),\r\n            assets: this.getLinksFromMatches(assets)\r\n        }\r\n    }\r\n    getLinksFromMatches(matches){\r\n        if(!matches) return []\r\n        let links = []\r\n        matches.map(match => {\r\n            let link = match.match(/(href|src)\\=(\\\"|\\')([^\\\"\\']*?)(\\\"|\\')/)\r\n            if(link.length && link[3]) {\r\n                link = link[3]\r\n                if(!link.match(/^http/)) {\r\n                    if(link[0] != '/') link = `https://${this.host}/${link}`\r\n                    else link = `https://${this.host}${link}`\r\n                }\r\n                if(link.match(/javascript\\:history/)) return false\r\n                let url = new URL(link)\r\n                if(url.hostname != this.host) return false\r\n                if(url) links.push(url.pathname)\r\n            }\r\n        })\r\n        return links\r\n    }\r\n    newPages(pages){\r\n        let newPages = []\r\n        pages.map(page => {\r\n            if(!this.pages.includes(page)) {\r\n                newPages.push(page)\r\n                this.pages.push(page)\r\n            }\r\n        })\r\n        return newPages\r\n    }\r\n    newAssets(assets){\r\n        let newAssets = []\r\n        assets.map(asset => {\r\n            if(!this.assets.includes(asset)) {\r\n                newAssets.push(asset)\r\n                this.assets.push(asset)\r\n            }\r\n        })\r\n        return newAssets\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./paw/classes/crawler.js?");

/***/ }),

/***/ "./paw/classes/deferrer.js":
/*!*********************************!*\
  !*** ./paw/classes/deferrer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Deferrer; });\n/* harmony import */ var _IDB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IDB */ \"./paw/classes/IDB.js\");\n\r\nclass Deferrer {\r\n\r\n    constructor(config){\r\n        config = Object.assign({\r\n            name: 'deferred'\r\n        }, config)\r\n        for(let key in config) this[key] = config[key]\r\n\r\n        if(!indexedDB) console.warn('indexedDB doesnt work here :(')\r\n\r\n        this.build()\r\n    }\r\n\r\n    build(){\r\n        this.db = new _IDB__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ name: this.name })\r\n    }\r\n\r\n    all(key){\r\n        return this.db.get(key)\r\n    }\r\n\r\n    save(key, fetchEvent){\r\n        let request = fetchEvent.request\r\n\r\n        let headers = {}\r\n        let hs = [...request.headers]\r\n        hs.map(h => { headers[h[0]] = h[1] })\r\n\r\n        return this.db.save({\r\n            key: key,\r\n            time: Date.now(),\r\n            url: request.url,\r\n            method: request.method,\r\n            headers: headers,\r\n            data: fetchEvent.data,\r\n            post: fetchEvent.post,\r\n            get: fetchEvent.get,\r\n        })\r\n    }\r\n    \r\n    load(key, url=null){\r\n        return this.all(key).then(res => {\r\n            return Promise.all(res.map((r)=>{\r\n                url = (url) ? url : r.value.url\r\n                return fetch(url, {\r\n                    method: r.value.method,\r\n                    // headers: r.headers,\r\n                    body: this.content(r.value.headers['content-type'], r.value.data)\r\n                })\r\n                .then(re => { return this.db.delete(r.key) })\r\n                .then(deleted => { return `key ${deleted} has been deleted` })\r\n            }))\r\n\r\n        })\r\n    }\r\n\r\n    content(contentType, data){ // js object to given  content type\r\n        if(contentType == 'application/x-www-form-urlencoded'){\r\n            let datas = new FormData()\r\n            for (let key in data){\r\n                datas.append(key, data[key])\r\n            }\r\n            return datas\r\n        }\r\n        if(contentType == 'application/json') return JSON.stringify(data)\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./paw/classes/deferrer.js?");

/***/ }),

/***/ "./paw/classes/route.js":
/*!******************************!*\
  !*** ./paw/classes/route.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Route; });\nclass Route {\r\n    constructor(path, callback, config){\r\n        config = Object.assign({\r\n            path: path,\r\n            callback: callback,\r\n            offline: false, // match only when offline\r\n            online: false, // match only when online\r\n            methods: 'GET,POST',\r\n            data: false, // match only if data are sent\r\n            // type: 'html', // html, json\r\n            strategy: null, // overwrite swrapper cache policy\r\n            headers: {}\r\n        }, config)\r\n        for(let key in config) this[key] = config[key]\r\n        if(this.type == 'html') this.headers[\"Content-Type\"] = 'text/html'\r\n        if(this.type == 'json') this.headers[\"Content-Type\"] = 'application/json'\r\n\r\n        this.init()\r\n    }\r\n\r\n    init(){\r\n        this.regPath = this.getRegPath()\r\n    }\r\n\r\n    setStrategy(strategy){\r\n        this.strategy = strategy\r\n    }\r\n    setStrategyNetwork(){\r\n        this.setStrategy('network')\r\n    }\r\n    setStrategyCache(){\r\n        this.setStrategy('cache')\r\n    }\r\n\r\n    redirectTo(path){\r\n        this.callback = ()=>{\r\n            return Response.redirect(path, 302);\r\n        }\r\n    }\r\n\r\n    getRegPath(){\r\n        let regPath = `^${this.path.replace(/\\//g, '\\\\\\/')}$`\r\n        regPath = regPath.replace(/\\*/, '.*?')\r\n        regPath = regPath.replace(/\\{([a-z]*?)\\}/g, '(?<$1>[^\\\\\\/]*?)')\r\n        return regPath\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./paw/classes/route.js?");

/***/ }),

/***/ "./paw/classes/router.js":
/*!*******************************!*\
  !*** ./paw/classes/router.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Router; });\n/* harmony import */ var _route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./route */ \"./paw/classes/route.js\");\n\r\n\r\nclass Router {\r\n\r\n  constructor(routes=[]){\r\n    this.routes = routes\r\n  }\r\n\r\n  routeMatch(fetchEvent) {\r\n      let path = (new URL(fetchEvent.request.url)).pathname\r\n      let matches = this.routes.filter((route) => {\r\n          if (!route.methods.toUpperCase().match(fetchEvent.request.method)) return false; // methods dont match\r\n          if(route.data && !fetchEvent.datas) return false;\r\n          if (route.offline && navigator.onLine) return false; // dont serve offline routes if online\r\n          if (route.online && !navigator.onLine) return false; // dont serve online routes if offline\r\n          if(!path.match(route.regPath)) return false;\r\n          return true;\r\n      })\r\n      return matches\r\n  }\r\n  routeMatchPath(path){\r\n      let matches = this.routes.filter((route) => {\r\n          if(!path.match(route.regPath)) return false;\r\n          return true;\r\n      })\r\n      return matches\r\n  }\r\n\r\n  resolve(fetchEvent){\r\n      return new Promise((res, rej)=>{\r\n          let routes = this.routeMatch(fetchEvent)\r\n          let response = null\r\n          let finalRoute = null\r\n          routes.map(route => {\r\n              if(response) return false\r\n              response = this.controller(route, fetchEvent)\r\n              finalRoute = route\r\n          })\r\n\r\n          if (response && response.constructor.name == 'Promise') response.then(resp => {\r\n              if (resp && resp.constructor.name == 'Response') res( resp )\r\n              else if (resp) res( new Response(resp, {status: 200, headers: finalRoute.headers}) )\r\n          })\r\n          .catch(err => {console.log(err)})\r\n\r\n          else if (response && response.constructor.name == 'Response') res( response )\r\n          else if (response) res( new Response(response, {status: 200, headers: finalRoute.headers}) )\r\n          else rej(finalRoute)\r\n      })\r\n  }\r\n\r\n  controller(route, e) {\r\n      if(!route.callback) return false\r\n\r\n      let capture = (new URL(e.request.url)).pathname.match(route.regPath)\r\n      let res = null\r\n\r\n      if(capture){\r\n          let values = []\r\n          for (let key in capture.groups ) values.push(capture.groups[key])\r\n          res = route.callback(e, ...values)\r\n      }\r\n      else {\r\n          res = route.callback(e)\r\n      }\r\n      return (res) ? res : false;\r\n  }\r\n\r\n  // register routes\r\n  route(path, callback=null, config={}) {\r\n      let route = new _route__WEBPACK_IMPORTED_MODULE_0__[\"default\"](path, callback, config)\r\n      this.routes.push(route)\r\n      return route\r\n  }\r\n  json(path, callback, config = {}){\r\n      return this.route(path, ()=>{ return JSON.stringify( callback() ) }, Object.assign(config, {json: true}))\r\n  }\r\n\r\n  // register offline routes\r\n  offline(path, callback, config = {}) {\r\n      return this.route(path, callback, Object.assign(config, {offline: true}))\r\n  }\r\n\r\n  // register online routes\r\n  online(path, callback, config = {}) {\r\n      return this.route(path, callback, Object.assign(config, {online: true}))\r\n  }\r\n\r\n  // match only when post/get data is sent\r\n  data(path, callback, config={}){\r\n      return this.route(path, callback, Object.assign(config, {data: true}))\r\n  }\r\n\r\n  // match only when post data is sent\r\n  post(path, callback, config={}){\r\n      return this.route(path, callback, Object.assign(config, {methods: 'POST', data: true}))\r\n  }\r\n\r\n  // match only when get data is sent\r\n  get(path, callback, config={}){\r\n      return this.route(path, callback, Object.assign(config, {methods: 'GET', data: true}))\r\n  }\r\n\r\n  redirect(from, to, config={}){\r\n      return this.route(from, ()=>{ return this.redirectResponse(to) }, config)\r\n  }\r\n  redirectResponse(path) {\r\n      return Response.redirect(path, 302);\r\n  }\r\n\r\n  setStrategyNetwork(routes){\r\n      return this.setStrategy('network', routes)\r\n  }\r\n  setStrategyCache(routes){\r\n      return this.setStrategy('cache', routes)\r\n  }\r\n\r\n  setStrategy(strategy, routes){\r\n    if(typeof(routes) == 'string') routes = [routes]\r\n    routes.map((path)=>{\r\n        let matches = this.routeMatchPath(path)\r\n        if(matches) matches.map(route => { route.setStrategy(strategy) })\r\n        else this.route(path).setStrategy(strategy)\r\n    })\r\n  }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./paw/classes/router.js?");

/***/ }),

/***/ "./paw/classes/sw-wrapper.js":
/*!***********************************!*\
  !*** ./paw/classes/sw-wrapper.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SWrapper; });\n/* harmony import */ var _route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./route */ \"./paw/classes/route.js\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router */ \"./paw/classes/router.js\");\n/* harmony import */ var _deferrer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deferrer */ \"./paw/classes/deferrer.js\");\n/* harmony import */ var _crawler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crawler */ \"./paw/classes/crawler.js\");\n\r\n\r\n\r\n\r\n\r\nclass SWrapper {\r\n\r\n    constructor(sw, config) {\r\n        this.config = Object.assign({\r\n            title: config.name,\r\n            cacheName: config.cacheName,\r\n            assetsCacheName: `${config.cacheName}-assets`,\r\n            deferrerName: `paw-deferred`,\r\n            offlinePage: config.offlinePage,\r\n            staticPages: config.staticPages,\r\n            strategy: config.strategy,\r\n            auto: true\r\n        }, config)\r\n        for (let key in this.config) this[key] = this.config[key]\r\n\r\n        this.init(sw)\r\n        this.bind()\r\n    }\r\n\r\n    init(sw) {\r\n        this.sw = sw\r\n        this.routes = []\r\n        this.offlineRoutes = []\r\n        this.deferrer = new _deferrer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]()\r\n        this.router = new _router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\r\n\r\n        this.router.setStrategyNetwork([\r\n            '/register.js',\r\n            '/sw.js'\r\n        ])\r\n\r\n    }\r\n\r\n    // addEventListeners\r\n    bind() {\r\n        this.bindInstall()\r\n        this.bindActivate()\r\n        this.bindFetch()\r\n\r\n        this.bindSync()\r\n\r\n        this.sw.addEventListener('push', (e) => {\r\n            e.waitUntil(this.notify(JSON.stringify(e.data), 'New push notification'))\r\n        })\r\n\r\n        this.sw.addEventListener('message', (e)=>{\r\n            if(e.data.action) return this.sw[e.data.action]()\r\n\r\n            if(e.data.sync) {\r\n                if(typeof e.data.sync == 'object') return this.sync(...e.data.sync)\r\n                else return this.sync(e.data.sync)\r\n            }\r\n\r\n            if(e.data == 'message-init') {\r\n                this.messagePort = e.ports[0]\r\n                return false\r\n            }\r\n\r\n            if(!e.ports.length) return false\r\n            let port = e.ports[0]\r\n            port.postMessage(e.data)\r\n        })\r\n    }\r\n    bindActivate(){\r\n        this.sw.addEventListener('activate', e => {\r\n            // clean old cache\r\n            e.waitUntil(caches.keys().then(keyList => {\r\n                return Promise.all(keyList.map(key => {\r\n                    if (\r\n                        key !== this.cacheName &&\r\n                        key !== this.assetsCacheName\r\n                    ) {\r\n                        return caches.delete(key)\r\n                    }\r\n                }))\r\n            }))\r\n            this.sw.skipWaiting()\r\n            this.sw.clients.claim()\r\n        })\r\n    }\r\n    bindInstall(){\r\n        this.sw.addEventListener('install', e => {\r\n            e.waitUntil(\r\n                Promise.all([\r\n                    this.addToCache(this.staticPages),\r\n                    this.autoCrawl()\r\n                ])\r\n            )\r\n        })\r\n    }\r\n    bindFetch(){\r\n        this.sw.addEventListener('fetch', e => {\r\n            e.respondWith(this.handleRequest(e))\r\n        })\r\n    }\r\n    bindSync(){\r\n        this.sw.addEventListener('sync', (e)=>{\r\n            this.notify(e)\r\n        })\r\n    }\r\n\r\n    // REQUESTS HANDLING\r\n    handleRequest(fetchEvent){\r\n        return this.prepareRequest(fetchEvent)\r\n        .then(()=>{\r\n            let matches = this.router.routeMatch(fetchEvent)\r\n            if (matches.length) {\r\n                return this.router.resolve(fetchEvent)\r\n                .then(res => { return res })\r\n                .catch(finalRoute => {\r\n                    if (finalRoute.strategy) return this.fetchStrategy(fetchEvent, finalRoute.strategy)\r\n                    else return this.defaultFetchStrategy(fetchEvent) // if no response handle basic response\r\n                })\r\n            }\r\n            else if (fetchEvent.request.mode == 'navigate') {\r\n                return this.defaultFetchStrategy(fetchEvent)\r\n            }\r\n            else {\r\n                return this.defaultAssetStrategy(fetchEvent)\r\n            }\r\n        })\r\n    }\r\n    prepareRequest(fetchEvent){\r\n        fetchEvent.data = {}\r\n        return Promise.all([\r\n            this.getPostData(fetchEvent),\r\n            this.getURLParamsData(fetchEvent)\r\n        ])\r\n    }\r\n    getPostData(fetchEvent){\r\n        let request = fetchEvent.request.clone()\r\n        return new Promise((res, rej)=>{\r\n            let requestData = this.fetchRequestData(request)\r\n            if(requestData) requestData.then((data)=>{\r\n\r\n                if(typeof data[Symbol.iterator] === 'function') {\r\n                    let objData = {}\r\n                    data.forEach((value, key) => { objData[key] = value });\r\n                    data = objData\r\n                }\r\n\r\n                if(Object.entries(data).length){\r\n                    if(!fetchEvent.data) fetchEvent.data = {}\r\n                    if(!fetchEvent.datas) fetchEvent.datas = {}\r\n                    fetchEvent.data.post = data\r\n                    fetchEvent.datas = Object.assign(fetchEvent.datas, data)\r\n                }\r\n\r\n                res()\r\n            })\r\n            else res(false)\r\n        })\r\n    }\r\n    fetchRequestData(request){\r\n        let headers = {}\r\n        let hs = [...request.headers]\r\n        hs.map(h => { headers[h[0]] = h[1] })\r\n        if(headers['content-type'] == 'application/x-www-form-urlencoded')\r\n        return request.formData()\r\n        else if(headers['content-type'] == 'application/json')\r\n        return request.json()\r\n        else if(headers['content-type'] == 'text/html')\r\n        return request.text()\r\n        else return false;\r\n    }\r\n\r\n    getURLParamsData(fetchEvent){\r\n        return new Promise((res, rej)=>{\r\n            let objData = {}\r\n            let data = new URL(fetchEvent.request.url).searchParams\r\n\r\n            if(typeof data[Symbol.iterator] === 'function') {\r\n                let objData = {}\r\n                data.forEach((value, key) => { objData[key] = value });\r\n                data = objData\r\n            }\r\n            if(Object.entries(data).length){\r\n                if(!fetchEvent.data) fetchEvent.data = {}\r\n                if(!fetchEvent.datas) fetchEvent.datas = {}\r\n                fetchEvent.data.get = data\r\n                fetchEvent.datas = Object.assign(fetchEvent.datas, data)\r\n            }\r\n\r\n            res()\r\n        })\r\n    }\r\n\r\n    // CACHE\r\n    storeResponse(cacheName, url, response) {\r\n        cacheName = (cacheName) ? cacheName : this.cacheName\r\n        let clone = response.clone()\r\n        caches.open(cacheName)\r\n        .then(cache => {\r\n            cache.put(url, clone)\r\n        })\r\n    }\r\n    clearOldCaches() {\r\n        return caches.keys().then(keyList => {\r\n            return Promise.all(keyList.map(key => {\r\n                if (key !== this.cacheName) {\r\n                    return caches.delete(key)\r\n                }\r\n            }))\r\n        })\r\n    }\r\n    clearCache(cacheName=null) {\r\n        cacheName = (cacheName) ? cacheName : this.cacheName\r\n        return caches.delete(cacheName)\r\n    }\r\n    addToCache(paths, cacheName=null){\r\n        cacheName = (cacheName) ? cacheName : this.cacheName\r\n        return caches.open(cacheName).then(cache => {\r\n            return cache.addAll(paths).catch(err => { console.log(err) })\r\n        })\r\n        .catch(err => { console.log(err) })\r\n    }\r\n\r\n    // STRATEGY\r\n    defaultFetchStrategy(e) {\r\n        return this.fetchStrategy(e, this.strategy)\r\n    }\r\n    defaultAssetStrategy(e){\r\n        return this.fetchStrategy(e, 'cache', this.assetsCacheName)\r\n    }\r\n\r\n    fetchStrategy(e, strategy, cacheName=null){\r\n        if (strategy == 'cache') return this.strategyCache(e, cacheName)\r\n        else if (strategy == 'network') return this.strategyNetwork(e, cacheName)\r\n        else return this.strategyCache(e, cacheName)\r\n    }\r\n    strategyNetwork(e, cacheName=null) {\r\n        cacheName = (cacheName) ? cacheName : this.cacheName\r\n        return fetch(e.request)\r\n        .then(response => {\r\n            if (response.status == 200) {\r\n                this.storeResponse(cacheName, e.request.url, response)\r\n            }\r\n            return response;\r\n        })\r\n        .catch(() => {\r\n            return caches.open(cacheName)\r\n            .then(cache => {\r\n                if (this.cacheMatch(cache, e)) return this.cacheMatch(e)\r\n                return cache.match(this.offlinePage)\r\n            })\r\n        })\r\n\r\n    }\r\n    strategyCache(e, cacheName=null) {\r\n        cacheName = (cacheName) ? cacheName : this.cacheName\r\n        return caches.open(cacheName)\r\n        .then(cache => {\r\n            return this.cacheMatch(cache, e).then(response => {\r\n                return response || fetch(e.request)\r\n                .then(response => {\r\n                    if (response.status == 200) {\r\n                        this.storeResponse(cacheName, e.request.url, response)\r\n                    }\r\n                    return response;\r\n                })\r\n            })\r\n        })\r\n    }\r\n    cacheMatch(cache, fetchEvent){\r\n        return cache.match(fetchEvent.request.url)\r\n    }\r\n\r\n    notify(body, title = false) {\r\n        if (Notification.permission == 'denied' || !Notification.permission) return false;\r\n        title = `${this.title} ${title ? '-' + title : ''}`\r\n        let options = {\r\n            body: `${body}`,\r\n            icon: (this.config.icons.length) ? this.config.icons[0] : '',\r\n            badge: this.config.badge\r\n        }\r\n        return this.sw.registration.showNotification(title, options)\r\n    }\r\n\r\n    // deferer\r\n    defer(key, fetchEvent){\r\n        return this.deferrer.save(key, fetchEvent)\r\n    }\r\n    sync(key, url=null){\r\n        return this.deferrer.load(key, url)\r\n    }\r\n    deferred(key){\r\n        return this.deferrer.all(key)\r\n    }\r\n\r\n    message(message){\r\n        if(!this.messagePort) {\r\n            setTimeout(()=>{\r\n                // retry until it works\r\n                this.message(message)\r\n            }, 200)\r\n        }\r\n        else this.messagePort.postMessage(message)\r\n    }\r\n\r\n\r\n    autoCrawl(){\r\n        this.crawler = new _crawler__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.sw.location.hostname)\r\n        return this.crawler.crawl('/')\r\n        .then((res)=>{\r\n            Promise.all([\r\n                this.addToCache(this.crawler.pages),\r\n                this.addToCache(this.crawler.assets, this.assetsCacheName)\r\n            ])\r\n            .then(()=>{\r\n                this.message('Static resources installation complete !')\r\n            })\r\n            .catch(()=>{\r\n                this.message('Static resources installation failed !')\r\n            })\r\n        })\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./paw/classes/sw-wrapper.js?");

/***/ }),

/***/ "./paw/config.json":
/*!*************************!*\
  !*** ./paw/config.json ***!
  \*************************/
/*! exports provided: name, short_name, theme_color, background_color, display, scope, orientation, start_url, charset, icons, badge, cacheName, privateKey, publicKey, strategy, debug, staticPages, offlinePage, notifications, messageTimeOut, messagePosition, updateText, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"paw\",\"short_name\":\"paw\",\"theme_color\":\"#fff\",\"background_color\":\"#474747\",\"display\":\"standalone\",\"scope\":\"/\",\"orientation\":\"portrait\",\"start_url\":\"/\",\"charset\":\"utf-8\",\"icons\":[\"icon-192.png\",\"icon-512.png\"],\"badge\":\"icon-192.png\",\"cacheName\":\"paw-cache\",\"privateKey\":\"4AtF_NBS2jXcgQNEdQmOFLMeqA2ZWylX-_PhIlOq4xE\",\"publicKey\":\"BE-bdUE6scWTi0HQzt3PujQcSDeCK0KKz-wCkq-XIfTIXhmawwI-dTUNZAZEH_X5rkDrBqbA71wba2CsAm7gyDA\",\"strategy\":\"network\",\"debug\":true,\"staticPages\":[\"/\"],\"offlinePage\":null,\"notifications\":true,\"messageTimeOut\":3000,\"messagePosition\":\"bottom\",\"updateText\":\"A new update is available, click on this message to <strong>update</strong>\"};\n\n//# sourceURL=webpack:///./paw/config.json?");

/***/ }),

/***/ "./paw/sw-dev.js":
/*!***********************!*\
  !*** ./paw/sw-dev.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_sw_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/sw-wrapper */ \"./paw/classes/sw-wrapper.js\");\n/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.json */ \"./paw/config.json\");\nvar _config_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./config.json */ \"./paw/config.json\", 1);\n\r\n\r\n// This file is processed during installation only\r\n\r\nlet sw = new _classes_sw_wrapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](self, _config_json__WEBPACK_IMPORTED_MODULE_1__)\r\nlet router = sw.router\r\n\r\nrouter.post('/', (e)=>{\r\n    return sw.defer('form', e).then(()=>{\r\n        sw.message('your data will be saved later')\r\n        return router.redirectResponse('/')\r\n    })\r\n})\r\nrouter.route('/deferred', ()=>{\r\n    return sw.deferred().then((datas)=>{\r\n        datas.map( deferred => {\r\n                return JSON.stringify(deferred)\r\n        }).join('<br>')\r\n    })\r\n})\r\n\r\n// router.route('/{path}', (e, path)=>{\r\n//     console.log(`path matched ${path}`)\r\n// })\r\nrouter.route('/paw/test', (e)=>{\r\n    return Object.keys(e).map((k,v) => {\r\n        return `${k} - ${JSON.stringify(e[k])}`\r\n    }).join('<br>')\r\n\r\n})\r\nrouter.route('/paw/{id}', (e, id)=>{\r\n    return id\r\n})\r\n\r\nrouter.route('/paw', (e)=>{\r\n    if(e.post) return JSON.stringify(e.data)\r\n    else return `\r\n    <!DOCTYPE html>\r\n    <html lang=\"en\" dir=\"ltr\">\r\n    <head>\r\n        <meta charset=\"utf-8\">\r\n        <title>PAW</title>\r\n        <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\">\r\n        <script src=\"/node_modules/paw/dist/tester.js\"></script>\r\n\r\n        <link rel=\"manifest\" href=\"/manifest.json\">\r\n        <script src=\"/register.js\"></script>\r\n\r\n    </head>\r\n    <body class=\"container\">\r\n        <h1>paw</h1>\r\n        <h2>Routed from your paw/sw.js</h2>\r\n        <ul>\r\n            <li><a href=\"/status\">custom <code>online/offline</code> callback then redirect</a></li>\r\n            <li><a href=\"/network\">custom json response with strategy <code>network</code></a></li>\r\n            <li><a href=\"/cache\">custom json response with strategy <code>cache</code></a></li>\r\n        </ul>\r\n\r\n        <div id=\"routeTesterContainer\"></div>\r\n    </body>\r\n    </html>\r\n    `\r\n})\r\nrouter.json('/paw/routes', ()=>{\r\n    return router.routes\r\n})\r\n\r\nrouter.json('/network', ()=>{\r\n    return {\r\n        foo: \"bar\"\r\n    }\r\n}).setStrategyNetwork()\r\n\r\nrouter.json('/cache', ()=>{\r\n    return 'test'\r\n})\r\n\r\nrouter.online('/status', ()=>{\r\n    router.notify('You are online')\r\n    return router.redirectResponse('/')\r\n})\r\n\r\nrouter.offline('/status', ()=>{\r\n    router.notify('You are offline')\r\n    return router.redirectResponse('/')\r\n})\r\n\n\n//# sourceURL=webpack:///./paw/sw-dev.js?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./paw/sw-dev.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./paw/sw-dev.js */\"./paw/sw-dev.js\");\n\n\n//# sourceURL=webpack:///multi_./paw/sw-dev.js?");

/***/ })

/******/ });