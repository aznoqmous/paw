import RouteElement from './route-element'

export default class RouteTester {

    constructor(config){
        config = Object.assign({
            parent: null
        }, config)
        for(let key in config) this[key] = config[key]

        this.build()
        this.bind()
    }

    build(){
        this.input = document.createElement('input')
        this.input.className = 'form-control'

        this.output = document.createElement('div')

        this.parent.appendChild(this.input)
        this.parent.appendChild(this.output)
    }

    bind(){
        this.input.addEventListener('keyup', (e)=>{
            if(e.key != 'Enter') return false;
            this.test(this.input.value)
            this.input.value = ''
        })
    }

    test(path){
        let route = new RouteElement({
            path: path
        })
        let firstChild = (this.parent.children.length > 1) ? this.parent.children[1] : null;
        this.parent.insertBefore(route.el, firstChild)

        this.fetchKey(route, 'json')
        this.fetchKey(route, 'text')
        this.fetchKey(route, 'blob')
        this.fetchKey(route, 'arrayBuffer')
        this.fetchKey(route, 'formData')
    }

    fetchKey(route, key){
        fetch(route.path)
        .then(res => {
            route.update(res)
            if(!res.ok) return false
            return res[key]()
        })
        .then(data => {
            let obj = {}
            obj[key] = data
            route.update(obj)
        })
    }

}
