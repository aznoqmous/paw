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
        this.parent.appendChild(route.el)

        fetch(path)
        .then(res => {
            console.log(res)
        })
    }
}
