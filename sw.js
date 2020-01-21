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

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst CONFIG = {\r\n  title: 'PAW',\r\n  icon: 'icon-192.png',\r\n  badge: 'icon-192.png',\r\n  cacheName: `SW-cache-${Date.now()}`,\r\n  privateKey: '4AtF_NBS2jXcgQNEdQmOFLMeqA2ZWylX-_PhIlOq4xE',\r\n  publicKey: 'BE-bdUE6scWTi0HQzt3PujQcSDeCK0KKz-wCkq-XIfTIXhmawwI-dTUNZAZEH_X5rkDrBqbA71wba2CsAm7gyDA',\r\n  strategy: 'cache', // cache, network\r\n  debug: true,\r\n  staticPages: [\r\n    '/', // needed\r\n    '/public/index.html',\r\n    '/public/offline.html'\r\n  ],\r\n  offlinePage: null\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (CONFIG);\r\n\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/sw-wrapper.js":
/*!***************************!*\
  !*** ./src/sw-wrapper.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SWrapper; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module './entity/route'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\r\n\r\n\r\nclass SWrapper {\r\n\r\n  constructor(sw, config){\r\n    this.config = Object.assign({\r\n      title: _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].title,\r\n      cacheName: _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cacheName,\r\n      offlinePage: _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].offline, // offline page : takes first static cached request by default\r\n      strategy: _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].strategy\r\n    }, config)\r\n    this.staticPages = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].staticPages\r\n\r\n    for(let key in this.config) this[key] = this.config[key]\r\n\r\n    this.init(sw)\r\n    this.bind()\r\n  }\r\n  init(sw){\r\n    this.sw = sw\r\n    this.routes = []\r\n    this.offlineRoutes = []\r\n  }\r\n\r\n  bind(){\r\n\r\n    this.sw.addEventListener('install', e =>{\r\n      e.waitUntil(\r\n        // download static resources\r\n        caches.open(this.cacheName).then(cache => {\r\n          return cache.addAll(this.staticPages)\r\n        })\r\n      )\r\n    })\r\n\r\n    this.sw.addEventListener('activate', e => {\r\n      // clean old cache\r\n      e.waitUntil( this.clearOldCaches() )\r\n      this.sw.skipWaiting()\r\n      this.sw.clients.claim()\r\n\r\n    })\r\n\r\n    this.sw.addEventListener('fetch', e =>{\r\n\r\n      let matches = this.routeMatch(e.request)\r\n      if(matches.length) {\r\n        let response = this.controller(matches[0])\r\n        if(response) e.respondWith(response)\r\n        else this.defaultFetchStrategy(e)\r\n      }\r\n      else if(e.request.mode == 'navigate'){\r\n        this.defaultFetchStrategy(e)\r\n      }\r\n\r\n    })\r\n\r\n    this.sw.addEventListener('push', (e)=>{\r\n      e.waitUntil(this.notify(JSON.stringify(e.data), 'New push notification'))\r\n    })\r\n\r\n  }\r\n\r\n// CACHE\r\n  store(url, response){\r\n    let clone = response.clone()\r\n    caches.open(this.cacheName)\r\n    .then( cache => { cache.put(url, clone) })\r\n  }\r\n  clearOldCaches(){\r\n    return caches.keys().then(keyList => {\r\n      return Promise.all(keyList.map(key => {\r\n        if(key !== this.cacheName) {\r\n          return caches.delete(key)\r\n        }\r\n      }))\r\n    })\r\n  }\r\n  clearCache(){\r\n    return caches.delete(this.cacheName)\r\n  }\r\n\r\n\r\n// STRATEGY\r\ndefaultFetchStrategy(e){\r\n  if(this.strategy == 'cache') return this.strategyCache(e)\r\n  if(this.strategy == 'network') return this.strategyNetwork(e)\r\n}\r\n  strategyNetwork(e){\r\n    e.respondWith(\r\n      fetch(e.request)\r\n      .then(response => {\r\n        if(response.status == 200){\r\n          this.store(e.request.url, response)\r\n        }\r\n        return response;\r\n      })\r\n      .catch(()=>{\r\n        return caches.open(this.cacheName)\r\n        .then( cache => {\r\n          if(cache.match(e.request)) return cache.match(e.request)\r\n          return cache.match(this.offlinePage)\r\n        })\r\n      })\r\n    )\r\n  }\r\n  strategyCache(e){\r\n    e.respondWith(\r\n      caches.open(this.cacheName)\r\n      .then( cache => {\r\n        if(cache.match(e.request))\r\n\r\n        // to do : load new content\r\n        fetch(e.request)\r\n        .then(response => {\r\n          if(response.status == 200){\r\n            this.store(e.request.url, response)\r\n          }\r\n          return response;\r\n        })\r\n\r\n        return cache.match(e.request)\r\n      })\r\n\r\n    )\r\n  }\r\n\r\n\r\n// ROUTES\r\n  // register routes\r\n  route(path, callback, config){\r\n    this.routes.push( new !(function webpackMissingModule() { var e = new Error(\"Cannot find module './entity/route'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(path, callback, config) )\r\n  }\r\n  // register offline routes\r\n  offline(path, callback){\r\n    this.routes.push( new !(function webpackMissingModule() { var e = new Error(\"Cannot find module './entity/route'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(path, callback, { offline: true }) )\r\n  }\r\n  // register online routes\r\n  online(path, callback){\r\n    this.routes.push( new !(function webpackMissingModule() { var e = new Error(\"Cannot find module './entity/route'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(path, callback, { online: true }) )\r\n  }\r\n  routeMatch(request){\r\n    let path = (new URL(request.url)).pathname\r\n    let matches = this.routes.filter((route)=>{\r\n      if(!route.methods.toLowerCase().match(request.method.toLowerCase())) return false; // methods dont match\r\n      if(path != route.path) return false; // path doesnt match\r\n      if(route.offline && navigator.onLine) return false; // dont serve offline routes if online\r\n      if(route.online && !navigator.onLine) return false; // dont serve online routes if offline\r\n      return true;\r\n    })\r\n    return matches\r\n  }\r\n  controller(route){\r\n    let content = route.callback()\r\n    if(content) return new Response(content, {status: 200})\r\n    else return false\r\n  }\r\n\r\n  notify(body, title=false){\r\n    title = `${this.title} ${title ? '-' + title : ''}`\r\n    let options = {\r\n      body: `${body}`,\r\n      icon: _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].icon,\r\n      badge: _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].badge\r\n    }\r\n    return this.sw.registration.showNotification(title, options)\r\n  }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./src/sw-wrapper.js?");

/***/ }),

/***/ "./src/sw.js":
/*!*******************!*\
  !*** ./src/sw.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sw_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sw-wrapper */ \"./src/sw-wrapper.js\");\n\r\n// This file is processed during installation only\r\n\r\nlet sw = new _sw_wrapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](self)\r\n\r\nsw.route('/', ()=>{\r\n  return 'index'\r\n})\r\n\r\nsw.online('/test', ()=>{\r\n  return JSON.stringify('offline')\r\n})\r\n\r\nsw.offline('/test', ()=>{\r\n  sw.notifiy('You are offline')\r\n  return JSON.stringify('online')\r\n})\r\n\r\nsw.notify('Installation complete !')\r\n\n\n//# sourceURL=webpack:///./src/sw.js?");

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./src/sw.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/sw.js */\"./src/sw.js\");\n\n\n//# sourceURL=webpack:///multi_./src/sw.js?");

/***/ })

/******/ });