import urlB64ToUint8Array from 'urlb64touint8array'

export default class RegisterWrapper {
  constructor(config){
    this.config = config
    this.title = this.config.name
    this.registration = null
    this.isSubscribed = null

    this.privateKey = urlB64ToUint8Array(this.config.privateKey)
    this.publicKey = this.config.publicKey
    this.notifications = this.config.notifications

    this.init()
  }
  init(){
    if (!navigator.serviceWorker) console.warn('No ServiceWorker available on current navigator.');
    else {

      window.addEventListener('DOMContentLoaded', ()=>{

        if(this.config.debug) console.log('Registering sw.js...')
        navigator.serviceWorker.register('sw.js')
        .then((registration)=>{
          // Registration was successful
          if(this.config.debug) console.log('Registration successful')
          this.registration = registration

          this.registration.addEventListener('updatefound', () => {
            var networker = registration.installing;

            networker.addEventListener('statechange', ()=>{
              if(this.config.debug) console.log('SW new state : ', networker.state);

            });

          });

          if(this.notifications) this.subscribe(registration)

        }).catch((err)=>{
          if(this.config.debug) console.warn("SW error : ", err);
        });
      });
    }
  }

  subscribe(registration){
    registration
    .pushManager.getSubscription()
    .then((sub)=>{
      this.isSubscribed = !(sub === null)
      if(this.config.debug) console.log(`subscribed ${(this.isSubscribed ? 'true': 'false')}`)
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
      if(this.config.debug) console.log('user subscribed')
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

}
