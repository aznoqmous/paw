export default class IDB {
    constructor(config){
        config = Object.assign({
            name: 'idb',
            tableName: 'data',
            built: false
        }, config)
        for(let key in config) this[key] = config[key]
        this.build().then(()=>{this.built = true})
    }

    build(){
        return new Promise((res, rej)=>{
            let connection = indexedDB.open(this.name, 1)

            connection.onsuccess = (e) => {
                this.db = e.target.result
                res(this.db)
            }

            connection.onerror = (err) => {
                console.error('indexedDB error', err)
                rej()
            }

            connection.onupgradeneeded = (e)=>{
                this.db = e.target.result
                this.table = this.db.createObjectStore(this.tableName, {
                    autoIncrement: true
                })
                this.table.createIndex('name', 'name', { unique: false })
                res(this.db)
            }
        })
    }
    getTransaction(){
        return this.db.transaction(this.tableName, 'readwrite').objectStore(this.tableName)
    }

    save(data){
        return new Promise(res => {
            if(!this.built) return this.build().then(()=>{this.save(data)})

            let request = this.getTransaction().add(data)
            request.onsuccess = (e)=>{ res(data) }
            request.onerror = (err)=>{ rej(err) }
        })
    }

    get(key=null){
        let elements = []
        return new Promise(res => {
            let request = this.getTransaction().openCursor()
            request.onsuccess = (e)=>{
                let element = e.target.result
                if(element) {
                    elements.push(this.clone(element))
                    element.continue()
                }
                else res(elements)
            }
            request.onerror = (err)=>{ console.error(err); rej(err) }
        })
    }
    delete(key){
        return new Promise(res => {
            let request = this.getTransaction().delete(key)
            request.onsuccess = ()=>{ res(key) }
            request.onerror = (err)=>{ console.error(err); rej(err) }
        })
    }

    clone(obj){
        let objCopy = {}
        for(let key in obj){
            objCopy[key] = obj[key]
        }
        return objCopy;
    }
}
