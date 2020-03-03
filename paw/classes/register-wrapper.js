import urlB64ToUint8Array from 'urlb64touint8array'
import Message from './message'
import Crawler from './crawler'

export default class RegisterWrapper {

    constructor(config) {
        if (window.location.protocol != 'https:') window.location.protocol = 'https:'
        this.config = config
        this.title = this.config.name
        this.registration = null
        this.isSubscribed = null

        this.privateKey = urlB64ToUint8Array(this.config.privateKey)
        this.publicKey = this.config.publicKey
        this.notifications = this.config.notifications

        this.messages = []

        this.init()
        this.createMessageHolder()
    }

    // navigator.serviceWorker.ready
    onReady(sw){
        if(this.config.debug) console.log('onReady', sw)
    }

    // new service worker is installed, is waiting > prompt update message on resolve
    onWaiting(sw){
        if(this.config.debug) console.log('onWaiting', sw)
        return new Promise(res => { res() })
    }

    onActivated(sw){
        if(this.config.debug) console.log('onActivated', sw)
        return new Promise(res => { res() })
    }

    // navigator.serviceWorker.oncontrollerchange > reload page on resolve
    onControllerChange(sw){
        if(this.config.debug) console.log('onControllerChange', sw)
    }

    init() {
        if (!navigator.serviceWorker) console.warn('No ServiceWorker available on current navigator.');
        else {
            window.addEventListener('DOMContentLoaded', () => {

                this.newMessageChannel('message')

                this.subscribeToNotifications()

                this.bindNetworkStateMessage()

                this.bindServiceWorkerReady()

                this.bindServiceWorkerControllerChange()

                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {

                        this.updateMessage()

                        this.bindUpdate(registration)

                        this.bindServiceWorkerUpdateFound(registration)

                    })
                    .catch(err => {console.error(err)})

            })
        }
    }

    bindServiceWorkerReady(){
        navigator.serviceWorker.ready.then(()=>{
            this.onReady(navigator.serviceWorker.controller)
        })
    }

    bindServiceWorkerControllerChange(){
        navigator.serviceWorker.addEventListener('controllerchange', (e)=>{
            this.onControllerChange(e.target.controller)
        })
    }

    bindUpdate(registration){
        setInterval(()=>{
            registration.update()
        }, 1000)
    }

    bindServiceWorkerUpdateFound(registration){
        registration.addEventListener('updatefound', ()=>{
            let networker = registration.installing

            networker.addEventListener('statechange', ()=>{

                if(networker.state == 'installed' && navigator.serviceWorker.controller) {

                    this.onWaiting(networker)
                        .then(()=>{
                            this.updateMessage()
                        })
                }

                if(networker.state == 'activated') {
                    this.onActivated(networker)
                        .then(()=>{
                            window.location.reload()
                        })
                }

            })

        })
    }

    bindControllerChange(){
        navigator.serviceWorker.addEventListener('controllerchange', (e) => {
            this.loaded()
            if(this.config.autoInstallation) {
                this.autoInstall().then(()=>{
                    this.message('Installation completed')
                    this.loaded()
                    window.location.reload()
                })
            }
            else window.location.reload()
        })
    }

    bindNetworkStateMessage() {
        this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        this.connection.addEventListener('change', (e) => {
            // e.preventDefault()
            this.message(`${(navigator.onLine)? `${this.config.onlineMessage} (${this.connection.effectiveType})` : this.config.offlineMessage}`)
        })
    }


    getRegistration(state=null){
        if(!state) return navigator.serviceWorker.getRegistration()
        return navigator.serviceWorker.getRegistration().then(reg => {
            return reg[state]
        })
        else Promise.reject()
    }

    updateMessage(sw){
        this.getRegistration('waiting').then((reg)=>{
            if(reg) this.message(this.config.updateText, { timeout: 5 * 3600 })
                .addEventListener('click', (e) => {
                    reg.postMessage('skipWaiting')
                })
        })
    }

    subscribeToNotifications() {
        return new Promise((res, rej)=>{
            if(this.notifications) return navigator.serviceWorker.getRegistration().then(registration => {
                return registration
                    .pushManager.getSubscription()
                    .then((sub) => {
                        this.isSubscribed = !(sub === null)
                        if (this.isSubscribed || !registration.active) return false

                        return registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: this.publicKey
                        })
                            .then((sub) => {
                                if (this.config.debug) this.message('user subscribed to notifications')
                                this.isSubscribed = true
                                this.notify('Notifications are now active')
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
            })
            else rej()
        })
    }


    notify(body, title = false) {
        if (!this.registration) return false;
        title = `${this.title}${title ? ' - ' + title : ''}`
        let options = {
            body: `${body}`,
            icon: (this.config.icons.length) ? this.config.icons[0] : '',
            badge: this.config.badge
        }
        return this.registration.showNotification(title, options)
    }

    message(content, config = {}) { // load message into html
        if (config.timeout === null) config.timeout = this.config.messageTimeOut
        return this.renderMessage(new Message(content, config))
    }

    // load deferred message
    loadMessage(message) {
        return this.renderMessage(new Message(message.content, config))
    }

    renderMessage(message) {
        if( !this.messages[message.key] ) this.messages[message.key] = []
        this.messages[message.key].push(message)
        this.messageHolder.appendChild(message.element)
        return message.element
    }

    createMessageHolder() {
        if (this.messageHolder) return false
        this.messageHolder = document.createElement('ul')
        this.messageHolder.className = "paw-messages"
        let styles = {
            position: 'fixed',
            left: '0',
            padding: '1rem',
            zIndex: 1000000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
            width: '100vw'
        }
        if(this.config.messagePosition == 'bottom') styles.bottom = '0'
        else styles.top = '0'

        for (let key in styles) this.messageHolder.style[key] = styles[key]

        if (document.body) document.body.appendChild(this.messageHolder)
        else document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(this.messageHolder)
        })

        this.deferredMessages = []
        window.addEventListener('unload', () => {
            let deferredMessages = this.messages.filter(msg => {
                if (msg && msg.state) return true
                else return false
            })
            localStorage.setItem('deferredMessages', JSON.stringify(deferredMessages))
        })
        window.addEventListener('DOMContentLoaded', () => {
            let deferredMessages = JSON.parse(localStorage.getItem('deferredMessages'))
            if (deferredMessages) deferredMessages.map(msg => {
                this.loadMessage(msg)
            })
        })
    }


    newMessageChannel(key, config){
        if (!navigator.serviceWorker || !navigator.serviceWorker.controller) return setTimeout(()=>{
            this.newMessageChannel(key, config)
        }, 1000)
        let messageChannel = new MessageChannel()
        messageChannel.port1.onmessage = (e) => {
            if (e.data.error) return false
            else this.message(e.data, config)
        }
        navigator.serviceWorker.controller.postMessage(key, [messageChannel.port2])
    }

    autoInstall(sw){
        let crawled = 0
        let progress = 0

        this.crawler = new Crawler(window.location.origin, {
            onNewUrl: (url, crawler)=>{
                this.updateProgress(`${Object.keys(crawler.pages).length} pages / ${Object.keys(crawler.assets).length} assets discovered... (${progress}%)`)
            },
            onPageCrawled: ()=>{
                crawled++
                progress = Math.floor(crawled / Object.keys(this.crawler.pages).length * 100)
                this.updateProgress(`${Object.keys(this.crawler.pages).length} pages / ${Object.keys(this.crawler.assets).length} assets discovered... (${progress}%)`)
            }
        })

        return this.crawler.crawl()
        .then(()=>{
            let total = Object.keys(this.crawler.pages).length + Object.keys(this.crawler.assets).length
            this.updateProgress(`Adding ${total} resources to cache...`)
            console.log('crawl end')
            return Promise.allSettled([
                this.sw({do: 'addToCache', options: [ Object.keys(this.crawler.pages) ]}, sw),
                this.sw({do: 'addToAssetsCache', options: [ Object.keys(this.crawler.assets) ]}, sw)
            ])
        })
        .then(()=>{
            this.message('Installation completed')
            this.loaded()
            window.location.reload()
            return true
        })
    }

    loading() {
        if(!this.progress) {
            this.progress = new Message('Loading...', {timeout: 5 * 60 * 1000})
            this.renderMessage(this.progress)
        }
        if(!this.overlay){
            this.overlay = document.createElement('div')

            let styles = {
                background: this.config.overlayColor,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 100000,
                opacity: 1,
                transition: 'opacity 0.2s ease'
            }
            for(let key in styles) this.overlay.style[key] = styles[key]
            document.body.appendChild(this.overlay)
        }
    }

    updateProgress(state){
        if(!this.progress) this.loading()
        if(this.progress.element.style.display == 'none') this.progress.element.style.display = 'block'
        this.progress.setHtml(state)
    }

    loaded() {
        if(this.progress) this.progress.element.style.display = 'none'
        if(this.overlay) this.overlay.style.opacity = 0
        this.messages = []
    }


    // SW MESSAGING
    sw(message, sw=null) {
        sw = (sw)? sw : navigator.serviceWorker.controller
        if (!sw) setTimeout(()=>{ this.sw(message, sw) }, 1000)

        return new Promise((res, rej) => {
            let messageChannel = new MessageChannel()
            messageChannel.port1.onmessage = (e) => {
                if(!e.data) return rej(e)
                if (e.data.error) return rej(e.data.error)
                else return res(e.data)
            }
            sw.postMessage(message, [messageChannel.port2])
        })

    }

    sync(key) {
        return this.sw({sync: key})
    }

}
