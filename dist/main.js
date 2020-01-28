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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/urlb64touint8array/index.js":
/*!**************************************************!*\
  !*** ./node_modules/urlb64touint8array/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports =  function (base64String) {\n  var padding = '='.repeat((4 - base64String.length % 4) % 4);\n  var base64 = (base64String + padding)\n    .replace(/\\-/g, '+')\n    .replace(/_/g, '/');\n\n  var rawData = window.atob(base64);\n  var outputArray = new Uint8Array(rawData.length);\n\n  for (var i = 0; i < rawData.length; ++i) {\n    outputArray[i] = rawData.charCodeAt(i);\n  }\n  return outputArray;\n};\n\n\n//# sourceURL=webpack:///./node_modules/urlb64touint8array/index.js?");

/***/ }),

/***/ "./src/entity/route.js":
/*!*****************************!*\
  !*** ./src/entity/route.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Route; });\nclass Route {\r\n    constructor(path, callback, config){\r\n        config = Object.assign({\r\n            path: path,\r\n            callback: callback,\r\n            offline: false, // match only when offline\r\n            online: false, // match only when online\r\n            methods: 'get,post',\r\n            type: 'html', // html, json\r\n            strategy: null, // overwrite swrapper cache policy\r\n            headers: {}\r\n        }, config)\r\n        for(let key in config) this[key] = config[key]\r\n        if(this.type == 'html') this.headers[\"Content-Type\"] = 'text/html'\r\n        if(this.type == 'json') this.headers[\"Content-Type\"] = 'application/json'\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/entity/route.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: RegisterWrapper, SWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _register_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register-wrapper */ \"./src/register-wrapper.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"RegisterWrapper\", function() { return _register_wrapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _sw_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sw-wrapper */ \"./src/sw-wrapper.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SWrapper\", function() { return _sw_wrapper__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/register-wrapper.js":
/*!*********************************!*\
  !*** ./src/register-wrapper.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RegisterWrapper; });\n/* harmony import */ var urlb64touint8array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! urlb64touint8array */ \"./node_modules/urlb64touint8array/index.js\");\n/* harmony import */ var urlb64touint8array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urlb64touint8array__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nclass RegisterWrapper {\r\n    constructor(config){\r\n        if(window.location.protocol != 'https:') window.location.protocol = 'https:'\r\n        this.config = config\r\n        this.title = this.config.name\r\n        this.registration = null\r\n        this.isSubscribed = null\r\n\r\n        this.privateKey = urlb64touint8array__WEBPACK_IMPORTED_MODULE_0___default()(this.config.privateKey)\r\n        this.publicKey = this.config.publicKey\r\n        this.notifications = this.config.notifications\r\n\r\n        this.init()\r\n        this.createMessageHolder()\r\n        this.bindNetworkStateMessage()\r\n    }\r\n    init(){\r\n        if (!navigator.serviceWorker) console.warn('No ServiceWorker available on current navigator.');\r\n        else {\r\n\r\n            window.addEventListener('DOMContentLoaded', ()=>{\r\n\r\n                if(this.config.debug) this.message('Registering sw.js...')\r\n                navigator.serviceWorker.register('sw.js')\r\n                .then((registration)=>{\r\n                    // Registration was successful\r\n                    if(registration.waiting && registration.waiting.state == 'installed') {\r\n                        this.message(this.config.updateText, 5 * 3600)\r\n                        .addEventListener('click', ()=>{\r\n                            registration.waiting.postMessage({action: 'skipWaiting'})\r\n                        })\r\n                    }\r\n                    registration.update()\r\n\r\n                    if(this.config.debug) this.message('Registration successful')\r\n                    this.registration = registration\r\n\r\n                    this.registration.addEventListener('updatefound', () => {\r\n                        var networker = registration.installing;\r\n\r\n                        if(navigator.serviceWorker.controller) {\r\n\r\n                            this.message(this.config.updateText, 5 * 3600)\r\n                            .addEventListener('click', ()=>{\r\n                                networker.postMessage({action: 'skipWaiting'})\r\n                            })\r\n\r\n                        }\r\n\r\n                        networker.addEventListener('statechange', ()=>{\r\n\r\n                            if(this.config.debug) {\r\n                                this.message(`Update : ${networker.state}`);\r\n                            }\r\n                        });\r\n\r\n                    });\r\n\r\n                    if(this.notifications) this.subscribe(registration)\r\n\r\n                }).catch((err)=>{\r\n                    if(this.config.debug) this.message(\"SW error : \", err);\r\n                });\r\n\r\n                let refreshing = false\r\n                navigator.serviceWorker.addEventListener('controllerchange', (e)=>{\r\n                    if(refreshing) return false\r\n                    window.location.reload()\r\n                    refreshing = true\r\n                })\r\n            });\r\n        }\r\n    }\r\n\r\n    subscribe(registration){\r\n        registration\r\n        .pushManager.getSubscription()\r\n        .then((sub)=>{\r\n            this.isSubscribed = !(sub === null)\r\n            if(this.config.debug)this.message(`Notification subscribed ${(this.isSubscribed ? 'true': 'false')}`)\r\n            if(!this.isSubscribed) this.subscribeUser(registration)\r\n        })\r\n\r\n    }\r\n\r\n    subscribeUser(){\r\n        if(!this.registration.active) return false\r\n        this.registration.pushManager.subscribe({\r\n            userVisibleOnly: true,\r\n            applicationServerKey: this.publicKey\r\n        })\r\n        .then((sub)=>{\r\n            if(this.config.debug) this.message('user subscribed to notifications')\r\n            this.isSubscribed = true\r\n            this.notify('Notifications are now active', 'permission')\r\n        })\r\n        .catch((err)=>{console.log(err)})\r\n    }\r\n\r\n    notify(body, title=false){\r\n        if(!this.registration) return false;\r\n        title = `${this.title} - ${title ? title : 'New message'}`\r\n        let options = {\r\n            body: `${body}`,\r\n            icon: (this.config.icons.length) ? this.config.icons[0] : '',\r\n            badge: this.config.badge\r\n        }\r\n        return this.registration.showNotification(title, options)\r\n    }\r\n\r\n    bindNetworkStateMessage(){\r\n        this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;\r\n        this.connection.addEventListener('change', ()=>{\r\n            this.message(this.connection.effectiveType)\r\n        })\r\n    }\r\n\r\n    message(content, timeout=null){ // load message into html\r\n        if(timeout === null) timeout = this.config.messageTimeOut\r\n        let message = document.createElement('div')\r\n        let styles = {\r\n            padding: '1rem 2rem',\r\n            zIndex: '10000',\r\n            color: 'white',\r\n            background: 'rgba(0,0,0,0.7)',\r\n            borderRadius: '0.5rem',\r\n            marginBottom: '0.5rem',\r\n            boxShadow: '0 0.1rem 0.1rem rgba(0,0,0,0.2)'\r\n        }\r\n        for(let key in styles) message.style[key] = styles[key]\r\n        message.innerHTML = content\r\n        this.messageHolder.appendChild(message)\r\n        setTimeout(()=>{\r\n            message.parentElement.removeChild(message)\r\n        }, timeout)\r\n        return message\r\n    }\r\n    createMessageHolder(){\r\n        this.messageHolder = document.createElement('ul')\r\n        this.messageHolder.className = \"paw-messages\"\r\n        let styles = {\r\n            position: 'fixed',\r\n            left: '0',\r\n            bottom: '0',\r\n            padding: '1rem',\r\n            zIndex: '10000',\r\n            display: 'flex',\r\n            flexDirection: 'column',\r\n            justifyContent: 'center',\r\n            alignItems: 'center',\r\n            fontFamily: 'Arial, sans-serif',\r\n            width: '100vw'\r\n        }\r\n        for(let key in styles) this.messageHolder.style[key] = styles[key]\r\n\r\n        if(document.body) document.body.appendChild(this.messageHolder)\r\n        else document.addEventListener('DOMContentLoaded', ()=>{ document.body.appendChild(this.messageHolder) })\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./src/register-wrapper.js?");

/***/ }),

/***/ "./src/sw-wrapper.js":
/*!***************************!*\
  !*** ./src/sw-wrapper.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SWrapper; });\n/* harmony import */ var _entity_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity/route */ \"./src/entity/route.js\");\n\r\n\r\nclass SWrapper {\r\n\r\n    constructor(sw, config) {\r\n        this.config = Object.assign({\r\n            title: config.name,\r\n            cacheName: config.cacheName,\r\n            offlinePage: config.offlinePage,\r\n            staticPages: config.staticPages,\r\n            strategy: config.strategy\r\n        }, config)\r\n        for (let key in this.config) this[key] = this.config[key]\r\n\r\n        this.init(sw)\r\n        this.bind()\r\n    }\r\n\r\n    init(sw) {\r\n        this.sw = sw\r\n        this.routes = []\r\n        this.offlineRoutes = []\r\n    }\r\n\r\n    bind() {\r\n\r\n        this.sw.addEventListener('install', e => {\r\n            e.waitUntil(\r\n                // download static resources\r\n                caches.open(this.cacheName).then(cache => {\r\n                    return cache.addAll(this.staticPages)\r\n                })\r\n            )\r\n        })\r\n\r\n        this.sw.addEventListener('activate', e => {\r\n            // clean old cache\r\n            e.waitUntil(caches.keys().then(keyList => {\r\n                return Promise.all(keyList.map(key => {\r\n                    if (key !== this.cacheName) {\r\n                        return caches.delete(key)\r\n                    }\r\n                }))\r\n            }))\r\n            this.sw.skipWaiting()\r\n            this.sw.clients.claim()\r\n        })\r\n\r\n        this.sw.addEventListener('fetch', e => {\r\n            let matches = this.routeMatch(e.request)\r\n            if (matches.length) {\r\n                let route = matches[0]\r\n                let response = this.controller(route)\r\n                if (response.constructor.name == 'Response') e.respondWith(response)\r\n                else if (response) e.respondWith(new Response(response, {status: 200, headers: route.headers}))\r\n                else if (route.strategy) this.fetchStrategy(e, route.strategy)\r\n                else this.defaultFetchStrategy(e)\r\n            }\r\n            else if (e.request.mode == 'navigate') {\r\n                this.defaultFetchStrategy(e)\r\n            }\r\n\r\n        })\r\n\r\n        this.sw.addEventListener('push', (e) => {\r\n            e.waitUntil(this.notify(JSON.stringify(e.data), 'New push notification'))\r\n        })\r\n\r\n        this.sw.addEventListener('message', (e)=>{\r\n            if(e.data.action == 'skipWaiting') this.sw.skipWaiting()\r\n        })\r\n\r\n    }\r\n\r\n    // CACHE\r\n    store(url, response) {\r\n        let clone = response.clone()\r\n        caches.open(this.cacheName)\r\n            .then(cache => {\r\n                cache.put(url, clone)\r\n            })\r\n    }\r\n\r\n    clearOldCaches() {\r\n        return caches.keys().then(keyList => {\r\n            return Promise.all(keyList.map(key => {\r\n                if (key !== this.cacheName) {\r\n                    return caches.delete(key)\r\n                }\r\n            }))\r\n        })\r\n    }\r\n\r\n    clearCache() {\r\n        return caches.delete(this.cacheName)\r\n    }\r\n\r\n\r\n    // STRATEGY\r\n    defaultFetchStrategy(e) {\r\n        return this.fetchStrategy(e, this.strategy)\r\n    }\r\n\r\n    fetchStrategy(e, strategy){\r\n        if (strategy == 'cache') return this.strategyCache(e)\r\n        else if (strategy == 'network') return this.strategyNetwork(e)\r\n        else return this.strategyCache(e)\r\n    }\r\n\r\n    strategyNetwork(e) {\r\n        e.respondWith(\r\n            fetch(e.request)\r\n                .then(response => {\r\n                    if (response.status == 200) {\r\n                        this.store(e.request.url, response)\r\n                    }\r\n                    return response;\r\n                })\r\n                .catch(() => {\r\n                    return caches.open(this.cacheName)\r\n                        .then(cache => {\r\n                            if (cache.match(e.request)) return cache.match(e.request)\r\n                            return cache.match(this.offlinePage)\r\n                        })\r\n                })\r\n        )\r\n    }\r\n\r\n    strategyCache(e) {\r\n        e.respondWith(\r\n            caches.open(this.cacheName)\r\n                .then(cache => {\r\n                    return cache.match(e.request).then(response => {\r\n                        return response || fetch(e.request)\r\n                            .then(response => {\r\n                                if (response.status == 200) {\r\n                                    this.store(e.request.url, response)\r\n                                }\r\n                                return response;\r\n                            })\r\n                    })\r\n                })\r\n        )\r\n    }\r\n\r\n\r\n    // ROUTES\r\n    // register routes\r\n    route(path, callback, config) {\r\n        this.routes.push(new _entity_route__WEBPACK_IMPORTED_MODULE_0__[\"default\"](path, callback, config))\r\n    }\r\n    json(path, callback, config = {}){\r\n        this.route(path, ()=>{ return JSON.stringify( callback() ) }, Object.assign(config, {json: true}))\r\n    }\r\n\r\n    // register offline routes\r\n    offline(path, callback, config = {}) {\r\n        this.routes.push(new _entity_route__WEBPACK_IMPORTED_MODULE_0__[\"default\"](path, callback, Object.assign(config, {offline: true})))\r\n    }\r\n\r\n    // register online routes\r\n    online(path, callback, config = {}) {\r\n        this.routes.push(new _entity_route__WEBPACK_IMPORTED_MODULE_0__[\"default\"](path, callback, Object.assign(config, {online: true})))\r\n    }\r\n\r\n    redirect(from, to){\r\n        this.route(from, ()=>{ return this.redirectResponse(to) })\r\n    }\r\n    redirectResponse(path) {\r\n        return Response.redirect(path, 302);\r\n    }\r\n\r\n    routeMatch(request) {\r\n        let path = (new URL(request.url)).pathname\r\n        let matches = this.routes.filter((route) => {\r\n            if (!route.methods.toLowerCase().match(request.method.toLowerCase())) return false; // methods dont match\r\n            if (path != route.path) return false; // path doesnt match\r\n            if (route.offline && navigator.onLine) return false; // dont serve offline routes if online\r\n            if (route.online && !navigator.onLine) return false; // dont serve online routes if offline\r\n            return true;\r\n        })\r\n        return matches\r\n    }\r\n\r\n    controller(route) {\r\n        let content = route.callback()\r\n        if (content) return route.callback()\r\n        else return false\r\n    }\r\n\r\n    notify(body, title = false) {\r\n        if (Notification.permission == 'denied' || !Notification.permission) return false;\r\n        title = `${this.title} ${title ? '-' + title : ''}`\r\n        let options = {\r\n            body: `${body}`,\r\n            icon: (this.config.icons.length) ? this.config.icons[0] : '',\r\n            badge: this.config.badge\r\n        }\r\n        return this.sw.registration.showNotification(title, options)\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./src/sw-wrapper.js?");

/***/ })

/******/ });