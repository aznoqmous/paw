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

/***/ "../node_modules/urlb64touint8array/index.js":
/*!***************************************************!*\
  !*** ../node_modules/urlb64touint8array/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports =  function (base64String) {\n  var padding = '='.repeat((4 - base64String.length % 4) % 4);\n  var base64 = (base64String + padding)\n    .replace(/\\-/g, '+')\n    .replace(/_/g, '/');\n\n  var rawData = window.atob(base64);\n  var outputArray = new Uint8Array(rawData.length);\n\n  for (var i = 0; i < rawData.length; ++i) {\n    outputArray[i] = rawData.charCodeAt(i);\n  }\n  return outputArray;\n};\n\n\n//# sourceURL=webpack:///../node_modules/urlb64touint8array/index.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst CONFIG = {\r\n  title: 'PAW',\r\n  icon: 'icon-192.png',\r\n  badge: 'icon-192.png',\r\n  cacheName: `SW-cache-${Date.now()}`,\r\n  privateKey: '4AtF_NBS2jXcgQNEdQmOFLMeqA2ZWylX-_PhIlOq4xE',\r\n  publicKey: 'BE-bdUE6scWTi0HQzt3PujQcSDeCK0KKz-wCkq-XIfTIXhmawwI-dTUNZAZEH_X5rkDrBqbA71wba2CsAm7gyDA',\r\n  strategy: 'cache', // cache, network\r\n  debug: true,\r\n  staticPages: [\r\n    '/', // needed\r\n    '/public/index.html',\r\n    '/public/offline.html'\r\n  ],\r\n  offlinePage: null\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (CONFIG);\r\n\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/register-wrapper.js":
/*!*********************************!*\
  !*** ./src/register-wrapper.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RegisterWrapper; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\n/* harmony import */ var urlb64touint8array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! urlb64touint8array */ \"../node_modules/urlb64touint8array/index.js\");\n/* harmony import */ var urlb64touint8array__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(urlb64touint8array__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nclass RegisterWrapper {\r\n  constructor(){\r\n    this.title = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].title\r\n    this.registration = null\r\n    this.isSubscribed = null\r\n\r\n    this.privateKey = urlb64touint8array__WEBPACK_IMPORTED_MODULE_1___default()(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].privateKey)\r\n    this.publicKey = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publicKey\r\n\r\n    this.init()\r\n  }\r\n  init(){\r\n    if (!navigator.serviceWorker) console.warn('No ServiceWorker available on current navigator.');\r\n    else {\r\n\r\n      window.addEventListener('DOMContentLoaded', ()=>{\r\n\r\n        if(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].debug) console.log('Registering sw.js...')\r\n        navigator.serviceWorker.register('sw.js')\r\n        .then((registration)=>{\r\n          // Registration was successful\r\n          if(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].debug) console.log('Registration successful')\r\n          this.registration = registration\r\n\r\n          this.registration.addEventListener('updatefound', () => {\r\n            var networker = registration.installing;\r\n\r\n            networker.addEventListener('statechange', ()=>{\r\n              if(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].debug) console.log('SW new state : ', networker.state);\r\n\r\n            });\r\n\r\n          });\r\n\r\n          this.subscribe()\r\n\r\n        }).catch((err)=>{\r\n          if(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].debug) console.warn(\"SW error : \", err);\r\n        });\r\n      });\r\n    }\r\n  }\r\n\r\n  subscribe(){\r\n\r\n    this.registration\r\n    .pushManager.getSubscription()\r\n    .then((sub)=>{\r\n      this.isSubscribed = !(sub === null)\r\n      // this.updateSubscriptionOnServer(sub)\r\n      if(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].debug) console.log(`subscribed  ${(this.isSubscribed ? 'true': 'false')}`)\r\n      if(!this.isSubscribed) this.subscribeUser(this.registration)\r\n    })\r\n\r\n  }\r\n\r\n  subscribeUser(){\r\n    this.registration.pushManager.subscribe({\r\n      userVisibleOnly: true,\r\n      applicationServerKey: this.publicKey\r\n    })\r\n    .then((sub)=>{\r\n      if(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].debug) console.log('user subscribed')\r\n\r\n      // this.updateSubscriptionOnServer(sub)\r\n\r\n      this.isSubscribed = true\r\n      this.notify('Notifications are now active', 'permission')\r\n    })\r\n    .catch((err)=>{console.log(err)})\r\n  }\r\n\r\n  // updateSubscriptionOnServer(){\r\n  //   if(CONFIG.debug) console.log('updateSubscriptionOnServer')\r\n  // }\r\n\r\n  notify(body, title=false){\r\n    if(!this.registration) return false;\r\n    title = `${this.title} - ${title ? title : 'New message'}`\r\n    let options = {\r\n      body: `${body}`,\r\n      icon: _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].icon,\r\n      badge: _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].badge\r\n    }\r\n    return this.registration.showNotification(title, options)\r\n  }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./src/register-wrapper.js?");

/***/ }),

/***/ "./src/register.js":
/*!*************************!*\
  !*** ./src/register.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _register_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register-wrapper */ \"./src/register-wrapper.js\");\n\r\n\r\nnew _register_wrapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\n\n\n//# sourceURL=webpack:///./src/register.js?");

/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./src/register.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/register.js */\"./src/register.js\");\n\n\n//# sourceURL=webpack:///multi_./src/register.js?");

/***/ })

/******/ });