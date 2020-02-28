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

    load(key, config){
        config = Object.assign({url: null, data: null}, config)

        return this.all(key).then(res => {
            return Promise.allSettled(res.map((r)=>{

                let url = (config.url) ? config.url : r.url

                url = (new URL(url).pathname)

                return fetch(url, {
                    method: r.method,
                    body: this.content(r.headers['content-type'], r.data, config.data)
                })
                .then(re => this.db.delete(r.key))
                .then(deleted => { console.log(`key ${r.key} has been deleted`) })
                .catch((err)=>{console.error(err)})
            }))

        })
    }

    content(contentType, data={}, newData={}){ // js data object to given content type

        data.get = (data.get) ? data.get : {}
        data.post = (data.post) ? data.post : {}

        if(newData.get) data.get = Object.assign(data.get, newData.get)
        if(newData.post) data.post = Object.assign(data.post, newData.post)


        if(contentType == 'application/x-www-form-urlencoded'){
            data = data.post
            let datas = new FormData()
            for (let key in data){
                datas.append(key, data[key])
            }
            return datas
        }

        if(contentType == 'application/json') return JSON.stringify(data)

        return data
    }

}
