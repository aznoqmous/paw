export default class RouteElement {
    constructor(data){
        this.data = {}
        for(let key in data) this.data[key] = data[key]

        this.build()
    }

    update(data){
        for(let key in data) this.data[key] = data[key]
        this.outputData()
    }

    build(){
        this.el = document.createElement('div')
        this.el.className = 'card p-2 mt-2'
        this.outputData()
        return this.el
    }

    outputData(){
        this.el.innerHTML = ''
        for(let key in this.data) {
            let dataType = typeof(this.data[key])

            if( dataType != 'object' && dataType != 'function') this.el.innerHTML += `<p><strong>${key} : </strong>${this.data[key]}</p>`
            if( dataType == 'object' ) this.el.innerHTML += `<p><strong>${key} : </strong>${JSON.stringify(this.data[key])}</p>`
        }
    }
}
