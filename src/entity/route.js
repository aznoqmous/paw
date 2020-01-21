export default class Route {
  constructor(path, callback, config){
    config = Object.assign({
        path: path,
        callback: callback,
        offline: false, // match only when offline
        online: false, // match only when online
        methods: 'get,post'
    }, config)
    for(let key in config) this[key] = config[key]
  }
}
