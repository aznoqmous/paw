import CONFIG from './config'
import urlB64ToUint8Array from 'urlb64touint8array'

export default class RegisterWrapper {
  constructor(){
    this.title = CONFIG.title
    this.registration = null
    this.isSubscribed = null

    this.privateKey = urlB64ToUint8Array(CONFIG.privateKey)
    this.publicKey = CONFIG.publicKey
    this.notifications = CONFIG.notifications

    this.init()
  }
  init(){
    if (!navigator.serviceWorker) console.warn('No ServiceWorker available on current navigator.');
    else {

      window.addEventListener('DOMContentLoaded', ()=>{

        if(CONFIG.debug) console.log('Registering sw.js...')
        navigator.serviceWorker.register('sw.js')
        .then((registration)=>{
          // Registration was successful
          if(CONFIG.debug) console.log('Registration successful')
          this.registration = registration

          this.registration.addEventListener('updatefound', () => {
            var networker = registration.installing;

            networker.addEventListener('statechange', ()=>{
              if(CONFIG.debug) console.log('SW new state : ', networker.state);

            });

          });

          if(this.notifications) this.subscribe(registration)

        }).catch((err)=>{
          if(CONFIG.debug) console.warn("SW error : ", err);
        });
      });
    }
  }

  subscribe(registration){
    registration
    .pushManager.getSubscription()
    .then((sub)=>{
      this.isSubscribed = !(sub === null)
      if(CONFIG.debug) console.log(`subscribed ${(this.isSubscribed ? 'true': 'false')}`)
      if(!this.isSubscribed) this.subscribeUser(registration)
    })

  }

  subscribeUser(){
    this.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.publicKey
    })
    .then((sub)=>{
      if(CONFIG.debug) console.log('user subscribed')
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
      icon: CONFIG.icon,
      badge: CONFIG.badge
    }
    return this.registration.showNotification(title, options)
  }

}
