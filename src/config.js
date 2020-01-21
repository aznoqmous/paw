const CONFIG = {
  title: 'PAW',
  icon: 'icon-192.png',
  badge: 'icon-192.png',
  cacheName: `SW-cache-${Date.now()}`,
  privateKey: '4AtF_NBS2jXcgQNEdQmOFLMeqA2ZWylX-_PhIlOq4xE',
  publicKey: 'BE-bdUE6scWTi0HQzt3PujQcSDeCK0KKz-wCkq-XIfTIXhmawwI-dTUNZAZEH_X5rkDrBqbA71wba2CsAm7gyDA',
  strategy: 'cache', // cache, network
  debug: true,
  staticPages: [
    '/', // needed
    '/public/index.html',
    '/public/offline.html'
  ],
  offlinePage: null
}

export default CONFIG
