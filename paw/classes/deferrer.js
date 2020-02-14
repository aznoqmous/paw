import IDB from './IDB'
export default class Deferrer {

    constructor(config){
        config = Object.assign({
            name: 'deferred'
        }, config)
        for(let key in config) this[key] = config[key]

        if(!indexedDB) console.warn('indexedDB doesnt work here :(')

        this.build()
    }

    build(){
        this.db = new IDB({ name: this.name })
    }

    all(key){
        return this.db.get(key).then(datas => datas.map(data => data.value))
    }

    save(key, fetchEvent){
        let request = fetchEvent.request

        let headers = {}
        let hs = [...request.headers]
        hs.map(h => { headers[h[0]] = h[1] })

        return this.db.save({
            key: key,
            time: Date.now(),
            url: request.url,
            method: request.method,
            headers: headers,
            data: fetchEvent.data,
            post: fetchEvent.post,
            get: fetchEvent.get,
        })
    }

    load(key, url=null){
        return this.all(key).then(res => {
            return Promise.all(res.map((r)=>{
                url = (url) ? url : r.value.url
                return fetch(url, {
                    method: r.value.method,
                    // headers: r.headers,
                    body: this.content(r.value.headers['content-type'], r.value.data)
                })
                .then(re => { return this.db.delete(r.key) })
                .then(deleted => { return `key ${deleted} has been deleted` })
            }))

        })
    }

    content(contentType, data){ // js object to given  content type
        if(contentType == 'application/x-www-form-urlencoded'){
            let datas = new FormData()
            for (let key in data){
                datas.append(key, data[key])
            }
            return datas
        }
        if(contentType == 'application/json') return JSON.stringify(data)
    }

}
