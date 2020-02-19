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

/***/ "./paw/classes/crawler.js":
/*!********************************!*\
  !*** ./paw/classes/crawler.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Crawler; });\nclass Crawler {\r\n\r\n    constructor(host, config){\r\n        config = Object.assign({\r\n            host: host,\r\n            url: null,\r\n            pages: [],\r\n            assets: []\r\n        }, config)\r\n        for(let key in config) this[key] = config[key]\r\n    }\r\n\r\n    crawl(url){\r\n        return this.fetch(url)\r\n        .then((text)=>{\r\n            let links = this.extractLinks(text)\r\n            this.newAssets(links.assets)\r\n            return Promise.all(this.newPages(links.pages).map(a => {\r\n                return this.crawl(a)\r\n            }))\r\n            .then(()=>{ return this.pages })\r\n        })\r\n    }\r\n\r\n    fetch(url){\r\n        return new Promise((res, rej) => {\r\n            fetch(url)\r\n            .then(response => {\r\n                response.text()\r\n                .then(text => { res(text) })\r\n            })\r\n            .catch(err => { rej(err) })\r\n        })\r\n    }\r\n\r\n    extractLinks(text){\r\n        let pages = text.match(/\\<a[^\\>]*?href\\=(\\\"|\\')[^\\\"\\']*?(\\\"|\\')/g)\r\n        let lhrefs = text.match(/\\<link[^\\>]*?href\\=(\\\"|\\')[^\\\"\\']*?(\\\"|\\')/g)\r\n        let srcs = text.match(/src\\=(\\\"|\\')[^\\\"\\']*?(\\\"|\\')/g)\r\n\r\n        pages = (pages) ? pages : []\r\n        lhrefs = (lhrefs) ? lhrefs : []\r\n        srcs = (srcs) ? srcs : []\r\n        let assets = lhrefs.concat(srcs)\r\n\r\n        return {\r\n            pages: this.getLinksFromMatches(pages),\r\n            assets: this.getLinksFromMatches(assets)\r\n        }\r\n    }\r\n    getLinksFromMatches(matches){\r\n        if(!matches) return []\r\n        let links = []\r\n        matches.map(match => {\r\n            let link = match.match(/(href|src)\\=(\\\"|\\')([^\\\"\\']*?)(\\\"|\\')/)\r\n            if(link.length && link[3]) {\r\n                link = link[3]\r\n                if(!link.match(/^http/)) {\r\n                    if(link[0] != '/') link = `https://${this.host}/${link}`\r\n                    else link = `https://${this.host}${link}`\r\n                }\r\n                if(link.match(/javascript\\:history/)) return false\r\n                let url = new URL(link)\r\n                if(url.hostname != this.host) return false\r\n                if(url) links.push(url.pathname)\r\n            }\r\n        })\r\n        return links\r\n    }\r\n    newPages(pages){\r\n        let newPages = []\r\n        pages.map(page => {\r\n            if(!this.pages.includes(page)) {\r\n                newPages.push(page)\r\n                this.pages.push(page)\r\n            }\r\n        })\r\n        return newPages\r\n    }\r\n    newAssets(assets){\r\n        let newAssets = []\r\n        assets.map(asset => {\r\n            if(!this.assets.includes(asset)) {\r\n                newAssets.push(asset)\r\n                this.assets.push(asset)\r\n            }\r\n        })\r\n        return newAssets\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./paw/classes/crawler.js?");

/***/ }),

/***/ "./paw/classes/message.js":
/*!********************************!*\
  !*** ./paw/classes/message.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Message; });\nclass Message {\r\n    constructor(content, config){\r\n        config = Object.assign({\r\n            timeout: 3000,\r\n            time: Date.now(),\r\n            key: 'message'\r\n        }, config)\r\n        this.content = content\r\n        for(let key in config) this[key] = config[key]\r\n        this.build()\r\n    }\r\n\r\n    build(){\r\n        this.element = document.createElement('div')\r\n        let styles = {\r\n            padding: '1rem 2rem',\r\n            zIndex: '10000',\r\n            color: 'white',\r\n            background: 'rgba(0,0,0,0.7)',\r\n            borderRadius: '0.5rem',\r\n            marginBottom: '0.5rem',\r\n            boxShadow: '0 0.1rem 0.1rem rgba(0,0,0,0.2)',\r\n            cursor: 'pointer',\r\n            transition: 'all 0.2s ease',\r\n            opacity: '0'\r\n        }\r\n        for(let key in styles) this.element.style[key] = styles[key]\r\n        this.element.innerHTML = this.content\r\n\r\n        setTimeout(()=>{ this.element.style.opacity = 1 }, 200)\r\n\r\n        this.element.addEventListener('click', ()=>{\r\n            this.timeout = 0\r\n            this.setOff(0)\r\n        })\r\n\r\n        this.setOff(this.remaining)\r\n    }\r\n\r\n    get state(){\r\n        return this.remaining >= 0\r\n    }\r\n    get remaining(){\r\n        return (this.time + this.timeout) - Date.now()\r\n    }\r\n\r\n    setHtml(html){\r\n        this.element.innerHTML = html\r\n    }\r\n\r\n    setOff(timeout){\r\n        setTimeout(()=>{\r\n            if(this.element) this.element.style.opacity = 0\r\n        }, timeout )\r\n        setTimeout(()=>{\r\n            if(this.element.parentElement) this.element.parentElement.removeChild(this.element)\r\n        }, timeout + 200)\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./paw/classes/message.js?");

/***/ }),

/***/ "./paw/classes/register-wrapper.js":
/*!*****************************************!*\
  !*** ./paw/classes/register-wrapper.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RegisterWrapper; });\n/* harmony import */ var urlb64touint8array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! urlb64touint8array */ \"./node_modules/urlb64touint8array/index.js\");\n/* harmony import */ var urlb64touint8array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urlb64touint8array__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message */ \"./paw/classes/message.js\");\n/* harmony import */ var _crawler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crawler */ \"./paw/classes/crawler.js\");\n\r\n\r\n\r\n\r\nclass RegisterWrapper {\r\n    constructor(config) {\r\n        if (window.location.protocol != 'https:') window.location.protocol = 'https:'\r\n        this.config = config\r\n        this.title = this.config.name\r\n        this.registration = null\r\n        this.isSubscribed = null\r\n\r\n        this.privateKey = urlb64touint8array__WEBPACK_IMPORTED_MODULE_0___default()(this.config.privateKey)\r\n        this.publicKey = this.config.publicKey\r\n        this.notifications = this.config.notifications\r\n\r\n        this.messages = []\r\n\r\n        this.init()\r\n        this.bindNetworkStateMessage()\r\n        this.createMessageHolder()\r\n    }\r\n\r\n    init() {\r\n        if (!navigator.serviceWorker) console.warn('No ServiceWorker available on current navigator.');\r\n        else {\r\n            window.addEventListener('DOMContentLoaded', () => {\r\n\r\n                this.register('sw.js')\r\n\r\n                // bind reload on sw update\r\n                let refreshing = false\r\n                navigator.serviceWorker.addEventListener('controllerchange', (e) => {\r\n                    if (refreshing) return false\r\n\r\n                    this.loading()\r\n                    this.autoInstall()\r\n                    .then(()=>{\r\n                        console.log('autoInstall completed')\r\n                        this.loaded()\r\n                    })\r\n\r\n                    // window.location.reload()\r\n                    // refreshing = true\r\n\r\n                })\r\n            })\r\n\r\n            window.addEventListener('unload', () => {\r\n                this.unload()\r\n            })\r\n        }\r\n    }\r\n\r\n    register(sw) {\r\n        return navigator.serviceWorker.register(sw)\r\n            .then((registration) => {\r\n                this.registration = registration\r\n\r\n                this.newMessageChannel('message')\r\n\r\n                // Registration was successful\r\n                if (registration.waiting && registration.waiting.state == 'installed') {\r\n                    this.message(this.config.updateText, { timeout: 5 * 3600 })\r\n                        .addEventListener('click', (e) => {\r\n                            registration.waiting.postMessage({action: 'skipWaiting'})\r\n                            this.loading()\r\n                        })\r\n                }\r\n\r\n                this.registration.addEventListener('updatefound', () => {\r\n                    var networker = this.registration.installing;\r\n\r\n                    if (navigator.serviceWorker.controller) {\r\n                        this.message(this.config.updateText, { timeout: 5 * 3600 })\r\n                            .addEventListener('click', (e) => {\r\n                                networker.postMessage({action: 'skipWaiting'})\r\n                                this.loading()\r\n                            })\r\n                    }\r\n\r\n                    networker.addEventListener('statechange', () => {\r\n                        this.message(`Update : ${networker.state}`);\r\n                        this.loaded()\r\n                    });\r\n\r\n                });\r\n\r\n                this.registration.update()\r\n\r\n                if (this.notifications) this.subscribe(registration)\r\n\r\n            }).catch((err) => {\r\n                if (this.config.debug) this.message(`SW error : ${err}`);\r\n            });\r\n    }\r\n\r\n    subscribe(registration) {\r\n        registration\r\n            .pushManager.getSubscription()\r\n            .then((sub) => {\r\n                this.isSubscribed = !(sub === null)\r\n                if (!this.isSubscribed) this.subscribeUser(registration)\r\n            })\r\n    }\r\n\r\n    subscribeUser() {\r\n        if (!this.registration.active) return false\r\n        this.registration.pushManager.subscribe({\r\n            userVisibleOnly: true,\r\n            applicationServerKey: this.publicKey\r\n        })\r\n            .then((sub) => {\r\n                if (this.config.debug) this.message('user subscribed to notifications')\r\n                this.isSubscribed = true\r\n                this.notify('Notifications are now active')\r\n            })\r\n            .catch((err) => {\r\n                console.log(err)\r\n            })\r\n    }\r\n\r\n    notify(body, title = false) {\r\n        if (!this.registration) return false;\r\n        title = `${this.title}${title ? ' - ' + title : ''}`\r\n        let options = {\r\n            body: `${body}`,\r\n            icon: (this.config.icons.length) ? this.config.icons[0] : '',\r\n            badge: this.config.badge\r\n        }\r\n        return this.registration.showNotification(title, options)\r\n    }\r\n\r\n    bindNetworkStateMessage() {\r\n        this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;\r\n        this.connection.addEventListener('change', (e) => {\r\n            // e.preventDefault()\r\n            this.message(this.connection.effectiveType)\r\n        })\r\n    }\r\n\r\n    message(content, config = {}) { // load message into html\r\n        if (config.timeout === null) config.timeout = this.config.messageTimeOut\r\n        return this.renderMessage(new _message__WEBPACK_IMPORTED_MODULE_1__[\"default\"](content, config))\r\n    }\r\n\r\n    // load deferred message\r\n    loadMessage(message) {\r\n        return this.renderMessage(new _message__WEBPACK_IMPORTED_MODULE_1__[\"default\"](message.content, config))\r\n    }\r\n\r\n    renderMessage(message) {\r\n        if( !this.messages[message.key] ) this.messages[message.key] = []\r\n        this.messages[message.key].push(message)\r\n        this.messageHolder.appendChild(message.element)\r\n        return message.element\r\n    }\r\n\r\n    createMessageHolder() {\r\n        if (this.messageHolder) return false\r\n        this.messageHolder = document.createElement('ul')\r\n        this.messageHolder.className = \"paw-messages\"\r\n        let styles = {\r\n            position: 'fixed',\r\n            left: '0',\r\n            bottom: '0',\r\n            padding: '1rem',\r\n            zIndex: '10000',\r\n            display: 'flex',\r\n            flexDirection: 'column',\r\n            justifyContent: 'center',\r\n            alignItems: 'center',\r\n            fontFamily: 'Arial, sans-serif',\r\n            width: '100vw'\r\n        }\r\n        for (let key in styles) this.messageHolder.style[key] = styles[key]\r\n\r\n        if (document.body) document.body.appendChild(this.messageHolder)\r\n        else document.addEventListener('DOMContentLoaded', () => {\r\n            document.body.appendChild(this.messageHolder)\r\n        })\r\n\r\n        this.deferredMessages = []\r\n        window.addEventListener('unload', () => {\r\n            let deferredMessages = this.messages.filter(msg => {\r\n                if (msg && msg.state) return true\r\n                else return false\r\n            })\r\n            localStorage.setItem('deferredMessages', JSON.stringify(deferredMessages))\r\n        })\r\n        window.addEventListener('DOMContentLoaded', () => {\r\n            let deferredMessages = JSON.parse(localStorage.getItem('deferredMessages'))\r\n            if (deferredMessages) deferredMessages.map(msg => {\r\n                this.loadMessage(msg)\r\n            })\r\n        })\r\n    }\r\n\r\n    // SW MESSAGING\r\n    sw(message) {\r\n        if (!navigator.serviceWorker) return false\r\n        return new Promise((res, rej) => {\r\n            let messageChannel = new MessageChannel()\r\n            messageChannel.port1.onmessage = (e) => {\r\n                if (e.data.error) rej(e.data.error)\r\n                else res(e.data)\r\n            }\r\n            navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2])\r\n        })\r\n    }\r\n\r\n    sync(key) {\r\n        return this.sw({sync: key})\r\n    }\r\n\r\n    newMessageChannel(key, config){\r\n        if (!navigator.serviceWorker) return false\r\n        let messageChannel = new MessageChannel()\r\n        messageChannel.port1.onmessage = (e) => {\r\n            if (e.data.error) return false\r\n            else this.message(e.data, config)\r\n        }\r\n        navigator.serviceWorker.controller.postMessage(key, [messageChannel.port2])\r\n    }\r\n\r\n    autoInstall(){\r\n        this.crawler = new _crawler__WEBPACK_IMPORTED_MODULE_2__[\"default\"](window.location.hostname)\r\n        this.message('Installing resources for offline support...')\r\n        this.loading()\r\n        return this.crawler.crawl('/')\r\n        .then((res)=>{\r\n            console.log('rw crawl completed')\r\n            this.message(`Installing ${this.crawler.pages.length} pages...`)\r\n            this.message(`Installing ${this.crawler.assets.length} assets...`)\r\n            let total = this.crawler.pages.length + this.crawler.assets.length\r\n            let current = 0\r\n            return Promise.allSettled([\r\n                this.crawler.pages.map(page => {\r\n                    return this.sw({do: 'addToCache', options: [page]})\r\n                    .then(()=>{\r\n                        current++\r\n                        this.updateProgress(`${current}/${total} (${Math.floor(current/total*100)}%)`)\r\n                    })\r\n                }),\r\n                this.crawler.assets.map(asset => {\r\n                    return this.sw({do: 'addToAssetsCache', options: [asset]})\r\n                    .then(()=>{\r\n                        current++\r\n                        this.updateProgress(`${current}/${total} (${Math.floor(current/total*100)}%)`)\r\n                    })\r\n                })\r\n            ])\r\n            .then(()=>{\r\n                this.loaded()\r\n                this.message('Installation completed !')\r\n            })\r\n        })\r\n        return this.sw({do: 'install'})\r\n    }\r\n\r\n    loading() {\r\n        this.progress = document.createElement('div')\r\n        document.body.appendChild(this.progress)\r\n        document.body.style.transition = 'opacity 0.2s ease'\r\n        document.body.style.opacity = 0.5\r\n    }\r\n    updateProgress(state){\r\n        this.progress.innerHTML = state\r\n    }\r\n    loaded() {\r\n        document.body.style.opacity = 1\r\n        this.progress.style.display = 'none'\r\n    }\r\n\r\n    unload() {\r\n        document.body.style.opacity = 0\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./paw/classes/register-wrapper.js?");

/***/ }),

/***/ "./paw/config.json":
/*!*************************!*\
  !*** ./paw/config.json ***!
  \*************************/
/*! exports provided: name, short_name, theme_color, background_color, display, scope, orientation, start_url, charset, icons, badge, cacheName, privateKey, publicKey, strategy, debug, staticPages, offlinePage, notifications, messageTimeOut, messagePosition, updateText, autoInstallation, rootDirectory, publicDirectory, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"paw\",\"short_name\":\"paw\",\"theme_color\":\"#fff\",\"background_color\":\"#474747\",\"display\":\"standalone\",\"scope\":\"/\",\"orientation\":\"portrait\",\"start_url\":\"/\",\"charset\":\"utf-8\",\"icons\":[\"icon-192.png\",\"icon-512.png\"],\"badge\":\"icon-192.png\",\"cacheName\":\"paw-cache\",\"privateKey\":\"4AtF_NBS2jXcgQNEdQmOFLMeqA2ZWylX-_PhIlOq4xE\",\"publicKey\":\"BE-bdUE6scWTi0HQzt3PujQcSDeCK0KKz-wCkq-XIfTIXhmawwI-dTUNZAZEH_X5rkDrBqbA71wba2CsAm7gyDA\",\"strategy\":\"network\",\"debug\":true,\"staticPages\":[\"/\"],\"offlinePage\":null,\"notifications\":true,\"messageTimeOut\":3000,\"messagePosition\":\"bottom\",\"updateText\":\"A new update is available, click on this message to <strong>update</strong>\",\"autoInstallation\":true,\"rootDirectory\":\"c:/laragon/www/paw\",\"publicDirectory\":\"\"};\n\n//# sourceURL=webpack:///./paw/config.json?");

/***/ }),

/***/ "./paw/register-dev.js":
/*!*****************************!*\
  !*** ./paw/register-dev.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_register_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/register-wrapper */ \"./paw/classes/register-wrapper.js\");\n/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.json */ \"./paw/config.json\");\nvar _config_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./config.json */ \"./paw/config.json\", 1);\n\r\n\r\n\r\nwindow.rw = new _classes_register_wrapper__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_config_json__WEBPACK_IMPORTED_MODULE_1__)\r\n\r\ndocument.addEventListener('DOMContentLoaded', ()=>{\r\n    let installBtn = document.createElement('span')\r\n    installBtn.innerHTML = 'install'\r\n    document.body.appendChild(installBtn)\r\n    installBtn.addEventListener('click', ()=>{\r\n        document.body.style.opacity = 0.2\r\n        rw.autoInstall()\r\n        .finally(()=>{\r\n            setTimeout(()=>{\r\n                document.body.style.opacity = 1\r\n                console.log('DONE !')\r\n            }, 1000)\r\n        })\r\n    })\r\n})\r\n\n\n//# sourceURL=webpack:///./paw/register-dev.js?");

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