!function(e){var t={};function i(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=1)}([function(e,t,i){"use strict";e.exports=function(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),i=window.atob(t),r=new Uint8Array(i.length),n=0;n<i.length;++n)r[n]=i.charCodeAt(n);return r}},function(e,t,i){e.exports=i(2)},function(e,t,i){"use strict";i.r(t);var r={title:"PAW",icon:"icon-192.png",badge:"icon-192.png",cacheName:`SW-cache-${Date.now()}`,privateKey:"4AtF_NBS2jXcgQNEdQmOFLMeqA2ZWylX-_PhIlOq4xE",publicKey:"BE-bdUE6scWTi0HQzt3PujQcSDeCK0KKz-wCkq-XIfTIXhmawwI-dTUNZAZEH_X5rkDrBqbA71wba2CsAm7gyDA",strategy:"cache",debug:!0,staticPages:["/","/public/index.html","/public/offline.html"],offlinePage:null},n=i(0),s=i.n(n);new class{constructor(){this.title=r.title,this.registration=null,this.isSubscribed=null,this.privateKey=s()(r.privateKey),this.publicKey=r.publicKey,this.init()}init(){navigator.serviceWorker?window.addEventListener("DOMContentLoaded",()=>{r.debug&&console.log("Registering sw.js..."),navigator.serviceWorker.register("sw.js").then(e=>{r.debug&&console.log("Registration successful"),this.registration=e,this.registration.addEventListener("updatefound",()=>{var t=e.installing;t.addEventListener("statechange",()=>{r.debug&&console.log("SW new state : ",t.state)})}),this.subscribe()}).catch(e=>{r.debug&&console.warn("SW error : ",e)})}):console.warn("No ServiceWorker available on current navigator.")}subscribe(){this.registration.pushManager.getSubscription().then(e=>{this.isSubscribed=!(null===e),r.debug&&console.log(`subscribed  ${this.isSubscribed?"true":"false"}`),this.isSubscribed||this.subscribeUser(this.registration)})}subscribeUser(){this.registration.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:this.publicKey}).then(e=>{r.debug&&console.log("user subscribed"),this.isSubscribed=!0,this.notify("Notifications are now active","permission")}).catch(e=>{console.log(e)})}notify(e,t=!1){if(!this.registration)return!1;t=`${this.title} - ${t||"New message"}`;let i={body:`${e}`,icon:r.icon,badge:r.badge};return this.registration.showNotification(t,i)}}}]);