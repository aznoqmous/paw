!function(e){var t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=2)}([function(e,t,s){var n=s(3),r=s(4);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var a={insert:"head",singleton:!1};n(r,a);e.exports=r.locals||{}},function(e,t,s){"use strict";e.exports=function(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),s=window.atob(t),n=new Uint8Array(s.length),r=0;r<s.length;++r)n[r]=s.charCodeAt(r);return n}},function(e,t,s){e.exports=s(6)},function(e,t,s){"use strict";var n,r=function(){return void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n},a=function(){var e={};return function(t){if(void 0===e[t]){var s=document.querySelector(t);if(window.HTMLIFrameElement&&s instanceof window.HTMLIFrameElement)try{s=s.contentDocument.head}catch(e){s=null}e[t]=s}return e[t]}}(),i=[];function o(e){for(var t=-1,s=0;s<i.length;s++)if(i[s].identifier===e){t=s;break}return t}function c(e,t){for(var s={},n=[],r=0;r<e.length;r++){var a=e[r],c=t.base?a[0]+t.base:a[0],l=s[c]||0,h="".concat(c," ").concat(l);s[c]=l+1;var d=o(h),u={css:a[1],media:a[2],sourceMap:a[3]};-1!==d?(i[d].references++,i[d].updater(u)):i.push({identifier:h,updater:m(u,t),references:1}),n.push(h)}return n}function l(e){var t=document.createElement("style"),n=e.attributes||{};if(void 0===n.nonce){var r=s.nc;r&&(n.nonce=r)}if(Object.keys(n).forEach((function(e){t.setAttribute(e,n[e])})),"function"==typeof e.insert)e.insert(t);else{var i=a(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}return t}var h,d=(h=[],function(e,t){return h[e]=t,h.filter(Boolean).join("\n")});function u(e,t,s,n){var r=s?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(e.styleSheet)e.styleSheet.cssText=d(t,r);else{var a=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}function g(e,t,s){var n=s.css,r=s.media,a=s.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),a&&btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var p=null,f=0;function m(e,t){var s,n,r;if(t.singleton){var a=f++;s=p||(p=l(t)),n=u.bind(null,s,a,!1),r=u.bind(null,s,a,!0)}else s=l(t),n=g.bind(null,s,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(s)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=r());var s=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var n=0;n<s.length;n++){var r=o(s[n]);i[r].references--}for(var a=c(e,t),l=0;l<s.length;l++){var h=o(s[l]);0===i[h].references&&(i[h].updater(),i.splice(h,1))}s=a}}}},function(e,t,s){(t=s(5)(!1)).push([e.i,'.paw-messages{position:"fixed";left:"50vw";z-zndex:1000000;display:"flex";flex-direction:"column";justify-content:"center";align-items:"center";font-family:"Arial, sans-serif";transform:"translate(-50%, 0)";padding:0;background:red !important}',""]),e.exports=t},function(e,t,s){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var s=function(e,t){var s=e[1]||"",n=e[3];if(!n)return s;if(t&&"function"==typeof btoa){var r=(i=n,o=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),"/*# ".concat(c," */")),a=n.sources.map((function(e){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(e," */")}));return[s].concat(a).concat([r]).join("\n")}var i,o,c;return[s].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(s,"}"):s})).join("")},t.i=function(e,s,n){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(n)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(r[i]=!0)}for(var o=0;o<e.length;o++){var c=[].concat(e[o]);n&&r[c[0]]||(s&&(c[2]?c[2]="".concat(s," and ").concat(c[2]):c[2]=s),t.push(c))}},t}},function(e,t,s){"use strict";s.r(t);var n=s(1),r=s.n(n);class a{constructor(e,t){t=Object.assign({timeout:3e3,time:Date.now(),key:"message"},t),this.content=e;for(let e in t)this[e]=t[e];this.build()}build(){this.element=document.createElement("div");let e={padding:"1rem 2rem",zIndex:"10000",color:"white",background:"rgba(0,0,0,0.7)",borderRadius:"0.5rem",marginBottom:"0.5rem",boxShadow:"0 0.1rem 0.1rem rgba(0,0,0,0.2)",cursor:"pointer",transition:"all 0.2s ease",opacity:"0",width:"auto",textAlign:"center",maxWidth:"calc(100vw - 2rem)"};for(let t in e)this.element.style[t]=e[t];this.element.innerHTML=this.content,setTimeout(()=>{this.element.style.opacity=1},200),this.element.addEventListener("click",()=>{this.timeout=0,this.setOff(0)}),this.setOff(this.remaining)}get state(){return this.remaining>=0}get remaining(){return this.time+this.timeout-Date.now()}setHtml(e){this.element.innerHTML=e}setOff(e){setTimeout(()=>{this.element&&(this.element.style.opacity=0)},e),setTimeout(()=>{this.element.parentElement&&this.element.parentElement.removeChild(this.element)},e+200)}}class i{constructor(e,t){t=Object.assign({host:new URL(e),url:e,pages:{},assets:{},errors:[],size:[],bgFetch:null,onNewUrl:null,onPageCrawled:null,timeout:1e4,allowedAssets:["css","js","jpg","jpeg","svg","png","ico","json","pdf","xml","txt"],allowedPages:["html","php"]},t);for(let e in t)this[e]=t[e]}crawlPageAssets(e=null){try{e=new URL(e)}catch{e=e||this.host}return this.fetch(e).then(t=>{this.newPages([e]);let s=this.extractLinks(this.host,t.text);return this.newAssets(s.assets)})}crawl(e=null){return e=e||this.host,this.fetch(e).then(t=>{let s=this.extractLinks(e,t.text),n=this.newPages(s.pages),r=this.newAssets(s.assets);return this.onPageCrawled&&this.onPageCrawled(e,n,r),n.length?Promise.allSettled(n.map(e=>this.crawl(e))):Promise.resolve()}).catch(t=>(this.errors[e]=t,delete this.pages[e],{error:t,url:e}))}fetch(e){let t=Date.now(),s=!1;return new Promise((n,r)=>{fetch(e).then(a=>{if(s)return!1;s=!0;let i=Date.now()-t;a.ok||r(a.status),a.text().then(t=>{n({url:e,time:i,text:t})})}).catch(e=>{r(e)}),setTimeout(()=>{if(s)return!1;s=!0,r({url:e.pathname,time:`took more than ${this.timeout}ms`})},this.timeout)})}extractLinks(e,t){let s=t.match(/\<base[^>]*?href\=[\"|\']([^\"\']*?)[\"|\']/);s.length&&(e=new URL(s[1]));let n=this.matchAll(/\<a[^>]*?href\=[\"|\']([^\"\']*?)[\"|\']/g,t),r=this.matchAll(/\<link[^>]*?href\=[\"|\']([^\"\']*?)[\"|\']/g,t),a=this.matchAll(/src\=[\"|\']([^\"\']*?)[\"|\']/g,t);n=n.filter(e=>!/\./.test(e)||this.allowedPages.filter(t=>{let s=e.split("/"),n=s[s.length-1];return!/\./.test(n)||new RegExp(`.${t}`).test(n)}).length>0),n=n.map(e=>{try{e=new URL(e)}catch(t){e=new URL(e,this.host)}return e}),n=n.filter(e=>e.host==this.host.host),r=r?[...r]:[],a=a?[...a]:[];let i=r.concat(a);return i=i.filter(e=>!!/\./.test(e)&&this.allowedAssets.filter(t=>new RegExp(`.${t}$`).test(e)).length>0),i=i.map(t=>/^\//.test(t)?new URL(t,this.host):new URL(t,e)),i=i.filter(t=>t.host==e.host),{pages:n,assets:i}}matchAll(e,t){return[...t.matchAll(e)].map(e=>e[1])}newPages(e){let t=[];return e.map(e=>{let s=`${e.origin}${e.pathname}`;Object.keys(this.pages).includes(s)||Object.keys(this.errors).includes(e)||(t.push(e),this.pages[s]=e,this.onNewUrl&&this.onNewUrl(e,this))}),t}newAssets(e){let t=[];return e.map(e=>{let s=`${e.origin}${e.pathname}`;Object.keys(this.assets).includes(s)||Object.keys(this.errors).includes(e)||(t.push(e),this.assets[s]=e,this.onNewUrl&&this.onNewUrl(e,this))}),t}}class o{constructor(e){"https:"!=window.location.protocol&&(window.location.protocol="https:"),this.config=e,this.title=this.config.name,this.registration=null,this.isSubscribed=null,this.privateKey=r()(this.config.privateKey),this.publicKey=this.config.publicKey,this.notifications=this.config.notifications,this.messages=[],this.init(),this.createMessageHolder()}init(){navigator.serviceWorker?window.addEventListener("DOMContentLoaded",()=>{this.newMessageChannel("message"),this.subscribeToNotifications(),this.bindNetworkStateMessage(),this.bindServiceWorkerReady(),this.bindServiceWorkerControllerChange(),navigator.serviceWorker.register("/sw.js").then(e=>{this.updateMessage(),this.bindUpdate(e),this.bindServiceWorkerUpdateFound(e)})}):console.warn("No ServiceWorker available on current navigator.")}bindServiceWorkerReady(){navigator.serviceWorker.ready.then(()=>{this.onReady(navigator.serviceWorker.controller)})}bindServiceWorkerControllerChange(){navigator.serviceWorker.addEventListener("controllerchange",e=>{this.onControllerChange(e.target.controller)})}bindUpdate(e){setInterval(()=>{e.update()},1e3)}bindServiceWorkerUpdateFound(e){e.addEventListener("updatefound",()=>{let t=e.installing;t.addEventListener("statechange",()=>{"installed"==t.state&&navigator.serviceWorker.controller&&this.onWaiting(t).then(()=>{this.updateMessage()}),"activated"==t.state&&this.onActivated(t).then(()=>{window.location.reload()})})})}bindControllerChange(){navigator.serviceWorker.addEventListener("controllerchange",e=>{this.loaded(),this.config.autoInstallation?this.autoInstall().then(()=>{this.message("Installation completed"),this.loaded(),window.location.reload()}):window.location.reload()})}bindNetworkStateMessage(){this.connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection,this.connection.addEventListener("change",e=>{this.message(`${navigator.onLine?`${this.config.onlineMessage} (${this.connection.effectiveType})`:this.config.offlineMessage}`)})}getRegistration(e=null){return new Promise((t,s)=>e?navigator.serviceWorker.getRegistration().then(n=>n[e]?t(n[e]):s(`no "${e}" state registration`,n)):navigator.serviceWorker.getRegistration().then(e=>t(e)))}updateMessage(e){navigator.serviceWorker.controller&&this.getRegistration("waiting").then(e=>{console.log(e),e&&this.message(this.config.updateText,{timeout:18e3}).addEventListener("click",t=>{e.postMessage("skipWaiting")})}).catch(e=>{console.log(e)})}subscribeToNotifications(){return this.notifications?navigator.serviceWorker.getRegistration().then(e=>e.pushManager.getSubscription().then(t=>(this.isSubscribed=!(null===t),!(this.isSubscribed||!e.active)&&e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:this.publicKey}).then(e=>{this.config.debug&&console.log("user subscribed to notifications"),this.isSubscribed=!0,this.notify("Notifications are now active")}).catch(e=>{console.log(e)})))):Promise.reject()}notify(e,t=!1){if(!this.registration)return!1;t=`${this.title}${t?" - "+t:""}`;let s={body:`${e}`,icon:this.config.icons.length?this.config.icons[0]:"",badge:this.config.badge};return this.registration.showNotification(t,s)}message(e,t={}){return null===t.timeout&&(t.timeout=this.config.messageTimeOut),this.renderMessage(new a(e,t))}loadMessage(e){return this.renderMessage(new a(e.content,config))}renderMessage(e){return this.messages[e.key]||(this.messages[e.key]=[]),this.messages[e.key].push(e),this.messageHolder.appendChild(e.element),e.element}createMessageHolder(){if(this.messageHolder)return!1;this.messageHolder=document.createElement("ul"),this.messageHolder.className="paw-messages";let e={position:"fixed",left:"50vw",zIndex:1e6,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",fontFamily:"Arial, sans-serif",transform:"translate(-50%, 0)",padding:0};"bottom"==this.config.messagePosition?e.bottom="1rem":e.top="1rem";for(let t in e)this.messageHolder.style[t]=e[t];document.body?document.body.appendChild(this.messageHolder):document.addEventListener("DOMContentLoaded",()=>{document.body.appendChild(this.messageHolder)}),this.deferredMessages=[],window.addEventListener("unload",()=>{let e=this.messages.filter(e=>!(!e||!e.state));localStorage.setItem("deferredMessages",JSON.stringify(e))}),window.addEventListener("DOMContentLoaded",()=>{let e=JSON.parse(localStorage.getItem("deferredMessages"));e&&e.map(e=>{this.loadMessage(e)})})}newMessageChannel(e,t){if(!navigator.serviceWorker||!navigator.serviceWorker.controller)return setTimeout(()=>{this.newMessageChannel(e,t)},1e3);let s=new MessageChannel;s.port1.onmessage=e=>{if(e.data.error)return!1;this.message(e.data,t)},navigator.serviceWorker.controller.postMessage(e,[s.port2])}autoInstall(e){let t=0,s=0;return this.crawler=new i(window.location.origin,{onNewUrl:(e,t)=>{this.updateProgress(`${Object.keys(t.pages).length} pages / ${Object.keys(t.assets).length} assets discovered... (${s}%)`)},onPageCrawled:()=>{t++,s=Math.floor(t/Object.keys(this.crawler.pages).length*100),this.updateProgress(`${Object.keys(this.crawler.pages).length} pages / ${Object.keys(this.crawler.assets).length} assets discovered... (${s}%)`)}}),this.crawler.crawl().then(()=>{let t=Object.keys(this.crawler.pages).length+Object.keys(this.crawler.assets).length;return this.updateProgress(`Adding ${t} resources to cache...`),console.log("crawl end"),Promise.allSettled([this.sw({do:"addToCache",options:[Object.keys(this.crawler.pages)]},e),this.sw({do:"addToAssetsCache",options:[Object.keys(this.crawler.assets)]},e)])}).then(()=>(this.message("Installation completed"),this.loaded(),window.location.reload(),!0))}loading(){if(this.progress||(this.progress=new a("Loading...",{timeout:3e5}),this.renderMessage(this.progress)),!this.overlay){this.overlay=document.createElement("div");let e={background:this.config.overlayColor,position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:1e5,opacity:1,transition:"opacity 0.2s ease"};for(let t in e)this.overlay.style[t]=e[t];document.body.appendChild(this.overlay)}}updateProgress(e){this.progress||this.loading(),"none"==this.progress.element.style.display&&(this.progress.element.style.display="block"),this.progress.setHtml(e)}loaded(){this.progress&&(this.progress.element.style.display="none"),this.overlay&&(this.overlay.style.opacity=0),this.messages=[]}sw(e,t=null){return(t=t||navigator.serviceWorker.controller)||setTimeout(()=>{this.sw(e,t)},1e3),new Promise((s,n)=>{let r=new MessageChannel;r.port1.onmessage=e=>e.data?e.data.error?n(e.data.error):s(e.data):n(e),t.postMessage(e,[r.port2])})}sync(e){return this.sw({sync:e})}onReady(e){this.config.debug&&console.log("onReady",e)}onWaiting(e){return this.config.debug&&console.log("onWaiting",e),new Promise(e=>{e()})}onActivated(e){return this.config.debug&&console.log("onActivated",e),new Promise(e=>{e()})}onControllerChange(e){this.config.debug&&console.log("onControllerChange",e)}}class c{constructor(e,t,s){s=Object.assign({path:e,callback:t,offline:!1,online:!1,methods:"GET,POST",data:!1,strategy:null,headers:{}},s);for(let e in s)this[e]=s[e];"html"==this.type&&(this.headers["Content-Type"]="text/html"),"json"==this.type&&(this.headers["Content-Type"]="application/json"),this.init()}init(){this.regPath=this.getRegPath()}setStrategy(e){this.strategy=e}setStrategyNetwork(){this.setStrategy("network")}setStrategyCache(){this.setStrategy("cache")}redirectTo(e){this.callback=()=>Response.redirect(e,302)}getRegPath(){let e=`^${this.path.replace(/\//g,"\\/")}$`;return e=e.replace(/\*/,"[^/]*?[/|$]"),e=e.replace(/\{([a-z]*?)\}/g,"(?<$1>[^\\/]*?)"),e}}class l{constructor(e=[]){this.routes=e}routeMatch(e){let t=decodeURI(new URL(e.request.url).pathname);return this.routes.filter(s=>!!s.methods.toUpperCase().match(e.request.method)&&(!(s.data&&!e.datas)&&((!s.offline||!navigator.onLine)&&(!(s.online&&!navigator.onLine)&&!!t.match(s.regPath)))))}routeMatchPath(e){return e=decodeURI(e),this.routes.filter(t=>!!e.match(t.regPath))}resolve(e){return new Promise((t,s)=>{let n=this.routeMatch(e),r=null,a=null;n.map(t=>{if(r)return!1;r=this.controller(t,e),a=t}),r&&"Promise"==r.constructor.name?r.then(e=>{e&&"Response"==e.constructor.name?t(e):e&&t(new Response(e,{status:200,headers:a.headers}))}).catch(e=>{console.log(e)}):r&&"Response"==r.constructor.name?t(r):r?t(new Response(r,{status:200,headers:a.headers})):s(a)})}controller(e,t){if(!e.callback)return!1;let s=decodeURI(new URL(t.request.url).pathname).match(e.regPath),n=null;if(s){let r=[];for(let e in s.groups)r.push(s.groups[e]);n=e.callback(t,...r)}else n=e.callback(t);return n||!1}route(e,t=null,s={}){if(e.map)return e.map(e=>this.route(e,t,s));let n=new c(e,t,s);return this.routes.push(n),n}json(e,t,s={}){return this.route(e,()=>"Promise"==t.constructor.name?t().then(e=>JSON.stringify(e)):JSON.stringify(t()),Object.assign(s,{type:"json"}))}html(e,t,s={}){return this.route(e,t,Object.assign(s,{type:"html"}))}offline(e,t,s={}){return this.route(e,t,Object.assign(s,{offline:!0}))}online(e,t,s={}){return this.route(e,t,Object.assign(s,{online:!0}))}data(e,t,s={}){return this.route(e,t,Object.assign(s,{data:!0}))}post(e,t,s={}){return this.route(e,t,Object.assign(s,{methods:"POST",data:!0}))}get(e,t,s={}){return this.route(e,t,Object.assign(s,{methods:"GET",data:!0}))}redirect(e,t,s={}){return this.route(e,()=>this.redirectResponse(t),s)}redirectResponse(e){return Response.redirect(e,302)}setStrategyNetwork(e){return this.setStrategy("network",e)}setStrategyCache(e){return this.setStrategy("cache",e)}setStrategy(e,t){"string"==typeof t&&(t=[t]),t.map(t=>{let s=this.routeMatchPath(t);s?s.map(t=>{t.setStrategy(e)}):this.route(t).setStrategy(e)})}handleRequest(e){return this.prepareRequest(e).then(()=>this.routeMatch(e).length?this.resolve(e).then(e=>({response:e})).catch(e=>({finalRoute:e})):e)}prepareRequest(e){return e.data={},Promise.allSettled([this.getPostData(e),this.getURLParamsData(e)])}getPostData(e){let t=e.request.clone();return new Promise((s,n)=>{let r=this.fetchRequestData(t);r?r.then(t=>{if("function"==typeof t[Symbol.iterator]){let e={};t.forEach((t,s)=>{e[s]=t}),t=e}Object.entries(t).length&&(e.data||(e.data={}),e.datas||(e.datas={}),e.data.post=t,e.datas=Object.assign(e.datas,t)),s()}):n()})}fetchRequestData(e){let t={};return[...e.headers].map(e=>{t[e[0]]=e[1]}),/application\/x\-www\-form\-urlencoded/.test(t["content-type"])||/multipart\/form\-data/.test(t["content-type"])?e.formData():/application\/json/.test(t["content-type"])?e.json():!!/text\/html/.test(t["content-type"])&&e.text()}getURLParamsData(e){return new Promise((t,s)=>{let n=new URL(e.request.url).searchParams;if("function"==typeof n[Symbol.iterator]){let e={};n.forEach((t,s)=>{e[s]=t}),n=e}Object.entries(n).length&&(e.data||(e.data={}),e.datas||(e.datas={}),e.data.get=n,e.datas=Object.assign(e.datas,n)),t()})}}class h{constructor(e){e=Object.assign({name:"idb",tableName:"data",built:!1},e);for(let t in e)this[t]=e[t];this.build().then(()=>{this.built=!0})}build(){return new Promise((e,t)=>{let s=indexedDB.open(this.name,1);s.onsuccess=t=>{this.db=t.target.result,e(this.db)},s.onerror=e=>{console.error("indexedDB error",e),t()},s.onupgradeneeded=t=>{this.db=t.target.result,this.table=this.db.createObjectStore(this.tableName,{autoIncrement:!0}),this.table.createIndex("by_key","key",{unique:!1}),e(this.db)}})}getTransaction(){return this.db.transaction(this.tableName,"readwrite").objectStore(this.tableName)}save(e){return new Promise(t=>{if(!this.built)return this.build().then(()=>{this.save(e)});let s=this.getTransaction().add(e);s.onsuccess=s=>{t(e)},s.onerror=e=>{rej(e)}})}get(e=null){let t=[];return new Promise((s,n)=>{let r=this.getTransaction().index("by_key").openCursor(IDBKeyRange.only(e));r.onsuccess=e=>{let n=e.target.result;n?(t.push(this.clone(n)),n.continue()):s(t)},r.onerror=e=>{console.error(e),n(e)}})}delete(e=null){let t=[];return new Promise((s,n)=>{let r=this.getTransaction().index("by_key").openCursor(IDBKeyRange.only(e));r.onsuccess=e=>{let n=e.target.result;n?(n.delete(),n.continue()):s(t)},r.onerror=e=>{console.error(e),n(e)}})}deleteById(e){return new Promise(t=>{let s=this.getTransaction().delete(e);s.onsuccess=()=>{t(e)},s.onerror=e=>{console.error(e),rej(e)}})}clone(e){let t={};for(let s in e)t[s]=e[s];return t}}class d{constructor(e){e=Object.assign({name:"deferred"},e);for(let t in e)this[t]=e[t];indexedDB||console.warn("indexedDB doesnt work here :("),this.build()}build(){this.db=new h({name:this.name})}all(e){return this.db.get(e).then(e=>e.map(e=>e.value))}save(e,t){let s=t.request,n={};return[...s.headers].map(e=>{n[e[0]]=e[1]}),this.db.save({key:e,time:Date.now(),url:s.url,method:s.method,headers:n,data:t.data,post:t.post,get:t.get})}load(e,t){return t=Object.assign({url:null,data:null},t),this.all(e).then(e=>Promise.allSettled(e.map(e=>{let s=t.url?t.url:e.url;return s=new URL(s).pathname,fetch(s,{method:e.method,body:this.content(e.headers["content-type"],e.data,t.data)}).then(t=>this.db.delete(e.key)).then(t=>{console.log(`key ${e.key} has been deleted`)}).catch(e=>{console.error(e)})})))}content(e,t={},s={}){if(t.get=t.get?t.get:{},t.post=t.post?t.post:{},s.get&&(t.get=Object.assign(t.get,s.get)),s.post&&(t.post=Object.assign(t.post,s.post)),"application/x-www-form-urlencoded"==e){t=t.post;let e=new FormData;for(let s in t)e.append(s,t[s]);return e}return"application/json"==e?JSON.stringify(t):t}}class u{constructor(e,t){this.config=Object.assign({assetsCacheName:`${t.cacheName}-assets`,deferrerName:"paw-deferred",staticPages:["/"]},t);for(let e in this.config)this[e]=this.config[e];this.assetsCacheName+=`-${Date.now()}`,this.cacheName+=`-${Date.now()}`,this.init(e),this.bind()}init(e){this.sw=e,this.deferrer=new d,this.router=new l,this.router.setStrategyNetwork(["/register.js","/sw.js"])}bind(){this.bindInstall(),this.bindActivate(),this.bindFetch(),this.bindSync(),this.bindMessages(),this.bindPushNotifications()}bindInstall(){this.sw.addEventListener("install",e=>{console.log("sw: install"),e.waitUntil(this.addPagesToCache(this.staticPages).then(()=>{console.log("install done, waiting...")}))})}bindActivate(){this.sw.addEventListener("activate",e=>{console.log("sw: activate"),e.waitUntil(this.clearOldCaches()),this.sw.clients.claim()})}bindFetch(){this.sw.addEventListener("fetch",e=>{e.respondWith(this.router.handleRequest(e).then(t=>t.response?t.response:t.finalRoute&&t.finalRoute.strategy?this.fetchStrategy(e,t.finalRoute.strategy):"navigate"==e.request.mode?this.defaultFetchStrategy(e):e.request.destination.length?this.defaultAssetStrategy(e):this.defaultFetchStrategy(e)))})}bindSync(){this.sw.addEventListener("sync",e=>{this.notify(e)})}bindMessages(){this.sw.addEventListener("message",e=>{if(console.log("message",e.data),"skipWaiting"==e.data)return this.sw.skipWaiting().then(e=>{console.log("skipwaiting success",e)}).catch(e=>{console.log("skipwaiting error",e)}),!0;if(this.registerMessageChannel(e))return!1;let t=!1;if(e.ports.length&&(t=e.ports[0]),e.data.sw)return t?this.sw[e.data.sw]().then(e=>t.postMessage(e)).catch(e=>t.postMessage(e)):this.sw[e.data.sw]().then(e=>{console.log("skipWaiting end")});if(e.data.action){if("skipWaiting"==e.data.action)return this.sw.skipWaiting();console.log("unhandled e.data.action",e.data.action)}if(e.data.do){let s=e.data.options?e.data.options:[];return t?this[e.data.do](...s).then(e=>{t.postMessage(e)}).catch(e=>{t.postMessage(e)}):this[e.data.do](...s)}return e.data.sync?t?this.sync(e.data.sync,e.data.config).then(e=>{t.postMessage(e)}).catch(e=>{t.postMessage(e)}):this.sync(e.data.sync,e.data.config):e.data.deferred?t?this.deferred(e.data.deferred).then(e=>{t.postMessage(e)}).catch(e=>{t.postMessage(e)}):this.deferred(e.data.deferred):void(t&&t.postMessage(e.data))})}bindPushNotifications(){this.sw.addEventListener("push",e=>{e.waitUntil(this.notify(JSON.stringify(e.data),"New push notification"))})}storeResponse(e,t,s){e=e||this.cacheName;let n=s.clone();caches.open(e).then(e=>{e.put(t,n)})}clearOldCaches(){return this.debug&&console.log("clearing old caches..."),caches.keys().then(e=>Promise.allSettled(e.map(e=>{if(![this.cacheName,this.assetsCacheName].includes(e))return caches.delete(e)})).then(()=>{this.debug&&console.log("clearing old cache end.")}))}clearCache(e=null){return e=e||this.cacheName,caches.delete(e)}addPagesToCache(e){this.debug&&console.log("adding pages to cache...",e);let t=new i(this.sw.location.origin);return Promise.allSettled(e.map(e=>Promise.allSettled([this.addToCache(e),t.crawlPageAssets(e)]))).then(()=>this.addToAssetsCache(Object.keys(t.assets))).then(e=>{this.debug&&console.log("adding pages to cache end.")})}addPageToCache(e){this.debug&&console.log("adding page to cache...",e);let t=new i(this.sw.location.origin);return Promise.allSettled([this.addToCache(e),t.crawlPageAssets(e).then(()=>this.addToAssetsCache(Object.keys(t.assets)))]).then(e=>{this.debug&&console.log("adding page to cache end.")})}addToCache(e,t=null){return t=t||this.cacheName,e.map||(e=[e]),caches.open(t).then(t=>Promise.allSettled(e.map(e=>t.add(e).catch(t=>{console.error(e,"add to cache failed")})))).catch(e=>{console.err("add to cache failed",e)})}addToAssetsCache(e){return this.addToCache(e,this.assetsCacheName)}defaultFetchStrategy(e){return this.fetchStrategy(e,this.strategy)}defaultAssetStrategy(e){return this.fetchStrategy(e,"cache",this.assetsCacheName)}fetchStrategy(e,t,s=null){return"cache"==t?this.strategyCache(e,s):"network"==t?this.strategyNetwork(e,s):this.strategyFastest(e,s)}strategyNetwork(e,t=null){return t=t||this.cacheName,fetch(e.request).then(s=>(200==s.status&&this.storeResponse(t,e.request.url,s),s)).catch(()=>caches.open(t).then(t=>this.cacheMatch(t,e)?this.cacheMatch(t,e):t.match(this.offlinePage)))}strategyCache(e,t=null){return t=t||this.cacheName,caches.open(t).then(s=>this.cacheMatch(s,e).then(s=>s||fetch(e.request).then(s=>(200==s.status&&this.storeResponse(t,e.request.url,s),s))))}strategyFastest(e,t=null){return Promise.race([this.strategyCache(e,t),this.strategyNetwork(e,t)]).then(e=>e)}cacheMatch(e,t){return e.match(t.request.url)}defer(e,t){return this.deferrer.save(e,t)}deferred(e){return this.deferrer.all(e)}sync(e,t={}){return this.deferrer.load(e,t)}notify(e,t=!1){if("denied"==Notification.permission||!Notification.permission)return!1;t=`${this.title} ${t?"-"+t:""}`;let s={body:`${e}`,icon:this.config.icons.length?this.config.icons[0]:"",badge:this.config.badge};return this.sw.registration.showNotification(t,s)}registerMessageChannel(e){return"message"==e.data&&(this.messagePort=e.ports[0],e.ports[0])}message(e){this.messagePort?this.messagePort.postMessage(e):setTimeout(()=>{this.message(e)},1e3)}}var g=s(0),p=s.n(g);s.d(t,"RegisterWrapper",(function(){return o})),s.d(t,"SWrapper",(function(){return u})),s.d(t,"Styles",(function(){return p.a}))}]);