export default class RouteElement {
    constructor(data){
        this.path = data.path
        this.data = data

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

        if(this.data.status && this.data.url) {
            let urlEl = new URL(this.data.url)
            this.el.innerHTML += `<div><span class="badge ${(this.data.status == 200) ? 'badge-success' : 'badge-danger' }">${this.data.status}</span>&nbsp;<em class="text ${(this.data.status == 200) ? 'text-success' : 'text-danger' }">${urlEl.pathname}</em></div>`
        }

        for(let key in this.data) {
            let dataType = typeof(this.data[key])

            if( dataType != 'object' && dataType != 'function') this.el.innerHTML += `<small><strong>${key} : </strong>${this.data[key]}</small>`

            if( dataType == 'object' ) {
                let data = JSON.stringify(this.data[key])
                data = `<code>${data}</code>`
                this.el.innerHTML += `<small><strong>${key} : </strong>${data}</small>`
            }

        }
    }
}
