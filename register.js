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

/***/ "./node_modules/urlb64touint8array/index.js":
/*!**************************************************!*\
  !*** ./node_modules/urlb64touint8array/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports =  function (base64String) {\n  var padding = '='.repeat((4 - base64String.length % 4) % 4);\n  var base64 = (base64String + padding)\n    .replace(/\\-/g, '+')\n    .replace(/_/g, '/');\n\n  var rawData = window.atob(base64);\n  var outputArray = new Uint8Array(rawData.length);\n\n  for (var i = 0; i < rawData.length; ++i) {\n    outputArray[i] = rawData.charCodeAt(i);\n  }\n  return outputArray;\n};\n\n\n//# sourceURL=webpack:///./node_modules/urlb64touint8array/index.js?");

/***/ }),

/***/ "./paw/classes/register-wrapper.js":
/*!*****************************************!*\
  !*** ./paw/classes/register-wrapper.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RegisterWrapper; });\n/* harmony import */ var urlb64touint8array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! urlb64touint8array */ \"./node_modules/urlb64touint8array/index.js\");\n/* harmony import */ var urlb64touint8array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urlb64touint8array__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nclass RegisterWrapper {\r\n    constructor(config){\r\n        console.log('rw initiation')\r\n        if(window.location.protocol != 'https:') window.location.protocol = 'https:'\r\n        this.config = config\r\n        this.title = this.config.name\r\n        this.registration = null\r\n        this.isSubscribed = null\r\n\r\n        this.privateKey = urlb64touint8array__WEBPACK_IMPORTED_MODULE_0___default()(this.config.privateKey)\r\n        this.publicKey = this.config.publicKey\r\n        this.notifications = this.config.notifications\r\n\r\n        this.init()\r\n        this.bindNetworkStateMessage()\r\n        this.createMessageHolder()\r\n    }\r\n    init(){\r\n        if (!navigator.serviceWorker) console.warn('No ServiceWorker available on current navigator.');\r\n        else {\r\n            window.addEventListener('DOMContentLoaded', ()=>{\r\n\r\n                this.register('sw.js')\r\n\r\n                // bind reload on sw update\r\n                let refreshing = false\r\n                navigator.serviceWorker.addEventListener('controllerchange', (e)=>{\r\n                    if(refreshing) return false\r\n                    window.location.reload()\r\n                    refreshing = true\r\n                })\r\n            })\r\n        }\r\n    }\r\n\r\n    register(sw){\r\n        return navigator.serviceWorker.register(sw)\r\n        .then((registration)=>{\r\n\r\n            // Registration was successful\r\n            if(registration.waiting && registration.waiting.state == 'installed') {\r\n                this.message(this.config.updateText, 5 * 3600)\r\n                .addEventListener('click', ()=>{\r\n                    registration.waiting.postMessage({action: 'skipWaiting'})\r\n                })\r\n            }\r\n\r\n            this.registration = registration\r\n\r\n            this.registration.addEventListener('updatefound', () => {\r\n                var networker = this.registration.installing;\r\n\r\n                if(navigator.serviceWorker.controller) {\r\n\r\n                    this.message(this.config.updateText, 5 * 3600)\r\n                    .addEventListener('click', ()=>{\r\n                        networker.postMessage({action: 'skipWaiting'})\r\n                    })\r\n\r\n                }\r\n\r\n                networker.addEventListener('statechange', ()=>{\r\n                    if(this.config.debug) this.message(`Update : ${networker.state}`);\r\n                });\r\n\r\n            });\r\n\r\n            this.registration.update()\r\n\r\n            this.bindSWMessages()\r\n\r\n            if(this.notifications) this.subscribe(registration)\r\n\r\n        }).catch((err)=>{\r\n            if(this.config.debug) this.message(\"SW error : \", err);\r\n        });\r\n    }\r\n\r\n    subscribe(registration){\r\n        registration\r\n        .pushManager.getSubscription()\r\n        .then((sub)=>{\r\n            this.isSubscribed = !(sub === null)\r\n            if(this.config.debug) this.message(`Notification subscribed ${(this.isSubscribed ? 'true': 'false')}`)\r\n            if(!this.isSubscribed) this.subscribeUser(registration)\r\n        })\r\n\r\n    }\r\n\r\n    subscribeUser(){\r\n        if(!this.registration.active) return false\r\n        this.registration.pushManager.subscribe({\r\n            userVisibleOnly: true,\r\n            applicationServerKey: this.publicKey\r\n        })\r\n        .then((sub)=>{\r\n            if(this.config.debug) this.message('user subscribed to notifications')\r\n            this.isSubscribed = true\r\n            this.notify('Notifications are now active', 'permission')\r\n        })\r\n        .catch((err)=>{console.log(err)})\r\n    }\r\n\r\n    notify(body, title=false){\r\n        if(!this.registration) return false;\r\n        title = `${this.title} - ${title ? title : 'New message'}`\r\n        let options = {\r\n            body: `${body}`,\r\n            icon: (this.config.icons.length) ? this.config.icons[0] : '',\r\n            badge: this.config.badge\r\n        }\r\n        return this.registration.showNotification(title, options)\r\n    }\r\n\r\n    sw(message){\r\n        if(!navigator.serviceWorker) return false\r\n        return new Promise((res, rej)=>{\r\n            let messageChannel = new MessageChannel()\r\n            messageChannel.port1.onmessage = (e)=>{\r\n                if(e.data.error) rej(e.data.error)\r\n                else res(e.data)\r\n            }\r\n            navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2])\r\n        })\r\n    }\r\n\r\n    bindSWMessages(){\r\n        if(!navigator.serviceWorker) return false\r\n        let messageChannel = new MessageChannel()\r\n        messageChannel.port1.onmessage = (e)=>{\r\n            if(e.data.error) return false\r\n            else this.message(e.data)\r\n        }\r\n        navigator.serviceWorker.controller.postMessage('message-init', [messageChannel.port2])\r\n    }\r\n    bindNetworkStateMessage(){\r\n        this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;\r\n        this.connection.addEventListener('change', (e)=>{\r\n            // e.preventDefault()\r\n            this.message(this.connection.effectiveType)\r\n        })\r\n    }\r\n\r\n    message(content, timeout=null){ // load message into html\r\n        console.log('new message', content)\r\n        if(timeout === null) timeout = this.config.messageTimeOut\r\n        let message = document.createElement('div')\r\n        let styles = {\r\n            padding: '1rem 2rem',\r\n            zIndex: '10000',\r\n            color: 'white',\r\n            background: 'rgba(0,0,0,0.7)',\r\n            borderRadius: '0.5rem',\r\n            marginBottom: '0.5rem',\r\n            boxShadow: '0 0.1rem 0.1rem rgba(0,0,0,0.2)'\r\n        }\r\n        for(let key in styles) message.style[key] = styles[key]\r\n        message.innerHTML = content\r\n        this.messageHolder.appendChild(message)\r\n        setTimeout(()=>{\r\n            message.parentElement.removeChild(message)\r\n        }, timeout)\r\n        return message\r\n    }\r\n    createMessageHolder(){\r\n        if(this.messageHolder) return false\r\n        this.messageHolder = document.createElement('ul')\r\n        this.messageHolder.className = \"paw-messages\"\r\n        let styles = {\r\n            position: 'fixed',\r\n            left: '0',\r\n            bottom: '0',\r\n            padding: '1rem',\r\n            zIndex: '10000',\r\n            display: 'flex',\r\n            flexDirection: 'column',\r\n            justifyContent: 'center',\r\n            alignItems: 'center',\r\n            fontFamily: 'Arial, sans-serif',\r\n            width: '100vw'\r\n        }\r\n        for(let key in styles) this.messageHolder.style[key] = styles[key]\r\n\r\n        if(document.body) document.body.appendChild(this.messageHolder)\r\n        else document.addEventListener('DOMContentLoaded', ()=>{\r\n            document.body.appendChild(this.messageHolder)\r\n        })\r\n\r\n        this.deferredMessages = []\r\n        window.addEventListener('unload', ()=>{\r\n            let messages = [...this.messageHolder.children]\r\n            let deferredMessages = messages.map(msg => msg.innerHTML)\r\n            localStorage.setItem('deferredMessages', JSON.stringify(deferredMessages))\r\n        })\r\n        window.addEventListener('DOMContentLoaded', ()=>{\r\n            let deferredMessages = JSON.parse(localStorage.getItem('deferredMessages'))\r\n            if(deferredMessages) deferredMessages.map(msg => { this.message(msg) })\r\n        })\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./paw/classes/register-wrapper.js?");

/***/ }),

/***/ "./paw/config.json":
/*!*************************!*\
  !*** ./paw/config.json ***!
  \*************************/
/*! exports provided: name, short_name, theme_color, background_color, display, scope, orientation, start_url, charset, icons, badge, cacheName, privateKey, publicKey, strategy, debug, staticPages, offlinePage, notifications, messageTimeOut, messagePosition, updateText, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"paw\",\"short_name\":\"paw\",\"theme_color\":\"#fff\",\"background_color\":\"#474747\",\"display\":\"standalone\",\"scope\":\"/\",\"orientation\":\"portrait\",\"start_url\":\"/\",\"charset\":\"utf-8\",\"icons\":[\"icon-192.png\",\"icon-512.png\"],\"badge\":\"icon-192.png\",\"cacheName\":\"paw-cache\",\"privateKey\":\"4AtF_NBS2jXcgQNEdQmOFLMeqA2ZWylX-_PhIlOq4xE\",\"publicKey\":\"BE-bdUE6scWTi0HQzt3PujQcSDeCK0KKz-wCkq-XIfTIXhmawwI-dTUNZAZEH_X5rkDrBqbA71wba2CsAm7gyDA\",\"strategy\":\"network\",\"debug\":true,\"staticPages\":[\"/\"],\"offlinePage\":null,\"notifications\":true,\"messageTimeOut\":3000,\"messagePosition\":\"bottom\",\"updateText\":\"A new update is available, click on this message to <strong>update</strong>\"};\n\n//# sourceURL=webpack:///./paw/config.json?");

/***/ }),

/***/ "./paw/register-dev.js":
/*!*****************************!*\
  !*** ./paw/register-dev.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_register_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/register-wrapper */ \"./paw/classes/register-wrapper.js\");\n/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.json */ \"./paw/config.json\");\nvar _config_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./config.json */ \"./paw/config.json\", 1);\n\r\n\r\n\r\nlet rw = new _classes_register_wrapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_config_json__WEBPACK_IMPORTED_MODULE_1__)\r\n\r\ndocument.addEventListener('DOMContentLoaded', ()=>{\r\n    rw.sw({sync: 'form-submissions'})\r\n    .then(res => console.log(res))\r\n    .catch(err => console.error(err))\r\n})\r\n\r\nwindow.addEventListener('load', ()=>{ console.log('load') })\r\nwindow.addEventListener('beforeunload', ()=>{ console.log('beforeunload') })\r\n\n\n//# sourceURL=webpack:///./paw/register-dev.js?");

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./paw/register-dev.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./paw/register-dev.js */\"./paw/register-dev.js\");\n\n\n//# sourceURL=webpack:///multi_./paw/register-dev.js?");

/***/ })

/******/ });