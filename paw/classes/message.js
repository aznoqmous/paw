export default class Message {
    constructor(content, config){
        config = Object.assign({
            timeout: 3000,
            time: Date.now(),
            key: 'message'
        }, config)
        this.content = content
        for(let key in config) this[key] = config[key]
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
            boxShadow: '0 0.1rem 0.1rem rgba(0,0,0,0.2)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            opacity: '0',
            width: 'auto',
            textAlign: 'center',
            maxWidth: 'calc(100vw - 2rem)'
        }
        for(let key in styles) this.element.style[key] = styles[key]
        this.element.innerHTML = this.content

        setTimeout(()=>{ this.element.style.opacity = 1 }, 200)

        this.element.addEventListener('click', ()=>{
            this.timeout = 0
            this.setOff(0)
        })

        this.setOff(this.remaining)
    }

    get state(){
        return this.remaining >= 0
    }
    get remaining(){
        return (this.time + this.timeout) - Date.now()
    }

    setHtml(html){
        this.element.innerHTML = html
    }

    setOff(timeout){
        setTimeout(()=>{
            if(this.element) this.element.style.opacity = 0
        }, timeout )
        setTimeout(()=>{
            if(this.element.parentElement) this.element.parentElement.removeChild(this.element)
        }, timeout + 200)
    }

}
