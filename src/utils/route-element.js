export default class RouteElement {
    constructor(config){
        config = Object.assign({
            path: null
        }, config)
        for(let key in config) this[key] = config[key]

        this.build()
    }

    update(config){
        for(let key in config) this[key] = config[key]

        el.innerHTML = ''

        el.innerHTML += `<p><strong>Path</strong>${path}</p>`

    }

    build(){
        this.el = document.createElement('div')
        return el
    }
}
