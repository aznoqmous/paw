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
        this.bindNetworkStateMessage()
        this.createMessageHolder()
    }

    init() {
        if (!navigator.serviceWorker) console.warn('No ServiceWorker available on current navigator.');
        else {
            window.addEventListener('DOMContentLoaded', () => {


                // bind reload on sw update
                navigator.serviceWorker.addEventListener('controllerchange', (e) => {
                    console.log('controllerchange')
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

                this.register('sw.js')

            })
        }
    }

    register(sw) {
        return navigator.serviceWorker.register(sw)
            .then((registration) => {
                this.registration = registration

                this.newMessageChannel('message')

                console.log(this.registration)


                // Registration was successful
                if (this.registration.waiting && this.registration.waiting.state == 'installed') {
                    console.log('installed')
                    this.message(this.config.updateText, { timeout: 5 * 3600 })
                        .addEventListener('click', (e) => {
                            this.registration.waiting.postMessage('skipWaiting')
                            this.message('rw installed')
                        })
                }

                this.registration.addEventListener('updatefound', () => {
                    let networker = this.registration.installing
                    console.log('updatefound')

                    networker.addEventListener('statechange', () => {
                        if(this.config.debug) this.message(`networker state : ${networker.state}`);
                    });

                    this.message(this.config.updateText, { timeout: 5 * 3600 })
                        .addEventListener('click', (e) => {
                            networker.postMessage('skipWaiting')
                            this.message('rw updatefound')
                        })
                });

                this.registration.update()
                if(this.config.debug) setInterval(()=>{
                    this.registration.update()
                }, 2000)

                if (this.notifications) this.subscribe(registration)

            }).catch((err) => {
                if (this.config.debug) this.message(`SW error : ${err}`);
            });
    }

    subscribe(registration) {
        registration
            .pushManager.getSubscription()
            .then((sub) => {
                this.isSubscribed = !(sub === null)
                if (!this.isSubscribed) this.subscribeUser(registration)
            })
    }

    subscribeUser() {
        if (!this.registration.active) return false
        this.registration.pushManager.subscribe({
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

    bindNetworkStateMessage() {
        this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        this.connection.addEventListener('change', (e) => {
            // e.preventDefault()
            this.message(`${(navigator.onLine)? `${this.config.onlineMessage} (${this.connection.effectiveType})` : this.config.offlineMessage}`)
        })
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

    // SW MESSAGING
    sw(message) {
        if (!navigator.serviceWorker) setTimeout(()=>{ this.sw(message) }, 1000)
        return new Promise((res, rej) => {
            let messageChannel = new MessageChannel()
            messageChannel.port1.onmessage = (e) => {
                if (e.data.error) rej(e.data.error)
                else res(e.data)
            }
            navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2])
        })
    }

    sync(key) {
        return this.sw({sync: key})
    }

    newMessageChannel(key, config){
        if (!navigator.serviceWorker) return false
        let messageChannel = new MessageChannel()
        messageChannel.port1.onmessage = (e) => {
            if (e.data.error) return false
            else this.message(e.data, config)
        }
        navigator.serviceWorker.controller.postMessage(key, [messageChannel.port2])
    }

    autoInstall(){
        this.loading()
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
                this.sw({do: 'addToCache', options: [ Object.keys(this.crawler.pages) ]}),
                this.sw({do: 'addToAssetsCache', options: [ Object.keys(this.crawler.assets) ]})
            ])
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

}
