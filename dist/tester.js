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

/***/ "./src/tester.js":
/*!***********************!*\
  !*** ./src/tester.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_route_tester__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/route-tester */ \"./src/utils/route-tester.js\");\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', ()=>{\r\n    new _utils_route_tester__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n        parent: routeTesterContainer\r\n    })\r\n})\r\n\n\n//# sourceURL=webpack:///./src/tester.js?");

/***/ }),

/***/ "./src/utils/route-element.js":
/*!************************************!*\
  !*** ./src/utils/route-element.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RouteElement; });\nclass RouteElement {\r\n    constructor(data){\r\n        this.data = {}\r\n        for(let key in data) this.data[key] = data[key]\r\n\r\n        this.build()\r\n    }\r\n\r\n    update(data){\r\n        for(let key in data) this.data[key] = data[key]\r\n        this.outputData()\r\n    }\r\n\r\n    build(){\r\n        this.el = document.createElement('div')\r\n        this.el.className = 'card p-2 mt-2'\r\n        this.outputData()\r\n        return this.el\r\n    }\r\n\r\n    outputData(){\r\n        this.el.innerHTML = ''\r\n        for(let key in this.data) {\r\n            let dataType = typeof(this.data[key])\r\n\r\n            if( dataType != 'object' && dataType != 'function') this.el.innerHTML += `<p><strong>${key} : </strong>${this.data[key]}</p>`\r\n            if( dataType == 'object' ) this.el.innerHTML += `<p><strong>${key} : </strong>${JSON.stringify(this.data[key])}</p>`\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/route-element.js?");

/***/ }),

/***/ "./src/utils/route-tester.js":
/*!***********************************!*\
  !*** ./src/utils/route-tester.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RouteTester; });\n/* harmony import */ var _route_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./route-element */ \"./src/utils/route-element.js\");\n\r\n\r\nclass RouteTester {\r\n\r\n    constructor(config){\r\n        config = Object.assign({\r\n            parent: null\r\n        }, config)\r\n        for(let key in config) this[key] = config[key]\r\n\r\n        this.build()\r\n        this.bind()\r\n    }\r\n\r\n    build(){\r\n        this.input = document.createElement('input')\r\n        this.input.className = 'form-control'\r\n\r\n        this.output = document.createElement('div')\r\n\r\n        this.parent.appendChild(this.input)\r\n        this.parent.appendChild(this.output)\r\n    }\r\n\r\n    bind(){\r\n        this.input.addEventListener('keyup', (e)=>{\r\n            if(e.key != 'Enter') return false;\r\n            this.test(this.input.value)\r\n            this.input.value = ''\r\n        })\r\n    }\r\n\r\n    test(path){\r\n        let route = new _route_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n            path: path\r\n        })\r\n        this.parent.appendChild(route.el)\r\n\r\n        fetch(path)\r\n        .then(res => {\r\n            route.update(res)\r\n            if(!res.ok) return false\r\n            res.json()\r\n            .then(json => route.update({json: json}))\r\n        })\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/utils/route-tester.js?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/tester.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/tester.js */\"./src/tester.js\");\n\n\n//# sourceURL=webpack:///multi_./src/tester.js?");

/***/ })

/******/ });