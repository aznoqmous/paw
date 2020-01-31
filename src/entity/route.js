export default class Route {
    constructor(path, callback, config){
        config = Object.assign({
            path: path,
            callback: callback,
            offline: false, // match only when offline
            online: false, // match only when online
            methods: 'get,post',
            type: 'html', // html, json
            strategy: null, // overwrite swrapper cache policy
            headers: {}
        }, config)
        for(let key in config) this[key] = config[key]
        if(this.type == 'html') this.headers["Content-Type"] = 'text/html'
        if(this.type == 'json') this.headers["Content-Type"] = 'application/json'

        this.init()
    }

    init(){
        this.regPath = this.getRegPath()
    }

    setStrategyNetwork(){
        this.strategy = 'network'
    }
    setStrategyCache(){
        this.strategy = 'cache'
    }

    redirectTo(path){
        this.callback = ()=>{
            return Response.redirect(path, 302);
        }
    }

    getRegPath(){
        let regPath = `^${this.path.replace(/\//g, '\\\/')}$`
        regPath = regPath.replace(/\*/, '.*?')
        regPath = regPath.replace(/\{([a-z]*?)\}/g, '(?<$1>[^\\\/]*?)')


        return regPath
    }

}
