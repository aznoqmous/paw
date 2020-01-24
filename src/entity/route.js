export default class Route {
  constructor(path, callback, config){
    config = Object.assign({
        path: path,
        callback: callback,
        offline: false, // match only when offline
        online: false, // match only when online
        methods: 'get,post',
        type: 'html', // html, json
        headers: {}
    }, config)
    for(let key in config) this[key] = config[key]
    if(this.type == 'html') this.headers.Accept = 'text/html'
    if(this.type == 'json') this.headers.Accept = 'application/json'
  }
}
