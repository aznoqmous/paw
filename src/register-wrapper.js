import urlB64ToUint8Array from 'urlb64touint8array'

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

        this.init()
        this.createMessageHolder()
        this.bindNetworkStateMessage()
    }
    init(){
        if (!navigator.serviceWorker) console.warn('No ServiceWorker available on current navigator.');
        else {

            window.addEventListener('DOMContentLoaded', ()=>{

                if(this.config.debug) this.message('Registering sw.js...')
                navigator.serviceWorker.register('sw.js')
                .then((registration)=>{
                    // Registration was successful
                    if(registration.waiting && registration.waiting.state == 'installed') {
                        this.message(this.config.updateText, 5 * 3600)
                        .addEventListener('click', ()=>{
                            registration.waiting.postMessage({action: 'skipWaiting'})
                        })
                    }
                    registration.update()

                    if(this.config.debug) this.message('Registration successful')
                    this.registration = registration

                    this.registration.addEventListener('updatefound', () => {
                        var networker = registration.installing;

                        if(navigator.serviceWorker.controller) {

                            this.message(this.config.updateText, 5 * 3600)
                            .addEventListener('click', ()=>{
                                networker.postMessage({action: 'skipWaiting'})
                            })

                        }

                        networker.addEventListener('statechange', ()=>{

                            if(this.config.debug) {
                                this.message(`Update : ${networker.state}`);
                            }
                        });

                    });

                    if(this.notifications) this.subscribe(registration)

                }).catch((err)=>{
                    if(this.config.debug) this.message("SW error : ", err);
                });

                let refreshing = false
                navigator.serviceWorker.addEventListener('controllerchange', (e)=>{
                    if(refreshing) return false
                    window.location.reload()
                    refreshing = true
                })
            });
        }
    }

    subscribe(registration){
        registration
        .pushManager.getSubscription()
        .then((sub)=>{
            this.isSubscribed = !(sub === null)
            if(this.config.debug)this.message(`Notification subscribed ${(this.isSubscribed ? 'true': 'false')}`)
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

    bindNetworkStateMessage(){
        this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        this.connection.addEventListener('change', ()=>{
            this.message(this.connection.effectiveType)
        })
    }

    message(content, timeout=null){ // load message into html
        if(timeout === null) timeout = this.config.messageTimeOut
        let message = document.createElement('div')
        let styles = {
            padding: '1rem 2rem',
            zIndex: '10000',
            color: 'white',
            background: 'rgba(0,0,0,0.7)',
            borderRadius: '0.5rem',
            marginBottom: '0.5rem',
            boxShadow: '0 0.1rem 0.1rem rgba(0,0,0,0.2)'
        }
        for(let key in styles) message.style[key] = styles[key]
        message.innerHTML = content
        this.messageHolder.appendChild(message)
        setTimeout(()=>{
            message.parentElement.removeChild(message)
        }, timeout)
        return message
    }
    createMessageHolder()
    {
        this.messageHolder = document.createElement('div')
        let styles = {
            position: 'fixed',
            left: '0',
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
        else document.addEventListener('DOMContentLoaded', ()=>{ document.body.appendChild(this.messageHolder) })
    }

}
