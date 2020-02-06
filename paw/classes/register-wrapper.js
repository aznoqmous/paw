import urlB64ToUint8Array from 'urlb64touint8array'
import Message from './message'

export default class RegisterWrapper {
    constructor(config){
        if(window.location.protocol != 'https:') window.location.protocol = 'https:'
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
    init(){
        if (!navigator.serviceWorker) console.warn('No ServiceWorker available on current navigator.');
        else {
            window.addEventListener('DOMContentLoaded', ()=>{

                this.register('sw.js')

                // bind reload on sw update
                let refreshing = false
                navigator.serviceWorker.addEventListener('controllerchange', (e)=>{
                    if(refreshing) return false
                    window.location.reload()
                    refreshing = true
                })
            })
        }
    }

    register(sw){
        return navigator.serviceWorker.register(sw)
        .then((registration)=>{

            // Registration was successful
            if(registration.waiting && registration.waiting.state == 'installed') {
                this.message(this.config.updateText, 5 * 3600)
                .addEventListener('click', (e)=>{
                    registration.waiting.postMessage({action: 'skipWaiting'})
                })
            }

            this.registration = registration

            this.registration.addEventListener('updatefound', () => {
                var networker = this.registration.installing;

                if(navigator.serviceWorker.controller) {

                    this.message(this.config.updateText, 5 * 3600)
                    .addEventListener('click', (e)=>{
                        networker.postMessage({action: 'skipWaiting'})

                    })

                }

                networker.addEventListener('statechange', ()=>{
                    if(this.config.debug) this.message(`Update : ${networker.state}`);
                });

            });

            this.registration.update()

            this.bindSWMessages()

            if(this.notifications) this.subscribe(registration)

        }).catch((err)=>{
            if(this.config.debug) this.message("SW error : ", err);
        });
    }

    subscribe(registration){
        registration
        .pushManager.getSubscription()
        .then((sub)=>{
            this.isSubscribed = !(sub === null)
            if(!this.isSubscribed) this.subscribeUser(registration)
        })
    }
    subscribeUser(){
        if(!this.registration.active) return false
        this.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.publicKey
        })
        .then((sub)=>{
            if(this.config.debug) this.message('user subscribed to notifications')
            this.isSubscribed = true
            this.notify('Notifications are now active', 'permission')
        })
        .catch((err)=>{console.log(err)})
    }

    notify(body, title=false){
        if(!this.registration) return false;
        title = `${this.title} - ${title ? title : 'New message'}`
        let options = {
            body: `${body}`,
            icon: (this.config.icons.length) ? this.config.icons[0] : '',
            badge: this.config.badge
        }
        return this.registration.showNotification(title, options)
    }

    sw(message){
        if(!navigator.serviceWorker) return false
        return new Promise((res, rej)=>{
            let messageChannel = new MessageChannel()
            messageChannel.port1.onmessage = (e)=>{
                if(e.data.error) rej(e.data.error)
                else res(e.data)
            }
            navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2])
        })
    }

    bindSWMessages(){
        if(!navigator.serviceWorker) return false
        let messageChannel = new MessageChannel()
        messageChannel.port1.onmessage = (e)=>{
            if(e.data.error) return false
            else this.message(e.data)
        }
        navigator.serviceWorker.controller.postMessage('message-init', [messageChannel.port2])
    }
    bindNetworkStateMessage(){
        this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        this.connection.addEventListener('change', (e)=>{
            // e.preventDefault()
            this.message(this.connection.effectiveType)
        })
    }

    message(content, timeout=null){ // load message into html
        if(timeout === null) timeout = this.config.messageTimeOut
        return this.renderMessage(new Message(content, timeout))
    }

    // load deferred message
    loadMessage(message){
        return this.renderMessage(new Message(message.content, message.timeout, message.time))
    }
    renderMessage(message){
        this.messages.push(message)
        this.messageHolder.appendChild(message.element)
        return message.element
    }
    createMessageHolder(){
        if(this.messageHolder) return false
        this.messageHolder = document.createElement('ul')
        this.messageHolder.className = "paw-messages"
        let styles = {
            position: 'fixed',
            left: '0',
            bottom: '0',
            padding: '1rem',
            zIndex: '10000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
            width: '100vw'
        }
        for(let key in styles) this.messageHolder.style[key] = styles[key]

        if(document.body) document.body.appendChild(this.messageHolder)
        else document.addEventListener('DOMContentLoaded', ()=>{
            document.body.appendChild(this.messageHolder)
        })

        this.deferredMessages = []
        window.addEventListener('unload', ()=>{
            let deferredMessages = this.messages.filter(msg => {
                if(msg && msg.state) return true
                else return false
            })
            localStorage.setItem('deferredMessages', JSON.stringify(deferredMessages))
        })
        window.addEventListener('DOMContentLoaded', ()=>{
            let deferredMessages = JSON.parse(localStorage.getItem('deferredMessages'))
            if(deferredMessages) deferredMessages.map(msg => {
                this.loadMessage(msg)
            })
        })
    }

}
