export default class Message {
    constructor(content, timeout, time){
        this.content = content
        this.timeout = timeout
        this.time = (time) ? time : Date.now()
        this.build()
    }
    load(savedMessage){
        // build from js Object
        for(let key in savedMessage) this[key] = savedMessage[key]
        this.build()
    }
    build(){
        this.element = document.createElement('div')
        let styles = {
            padding: '1rem 2rem',
            zIndex: '10000',
            color: 'white',
            background: 'rgba(0,0,0,0.7)',
            borderRadius: '0.5rem',
            marginBottom: '0.5rem',
            boxShadow: '0 0.1rem 0.1rem rgba(0,0,0,0.2)'
        }
        for(let key in styles) this.element.style[key] = styles[key]
        this.element.innerHTML = this.content
    }

    get state(){
        return this.remaining >= 0
    }
    get remaining(){
        return (this.time + this.timeout) - Date.now()
    }

}
