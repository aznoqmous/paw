export default class Crawler {

    constructor(host, config){
        config = Object.assign({
            host: host,
            url: null,
            pages: [],
            assets: []
        }, config)
        for(let key in config) this[key] = config[key]
    }

    crawl(url){
        return this.fetch(url)
        .then((text)=>{
            let links = this.extractLinks(text)
            this.newAssets(links.assets)

            return Promise.all(this.newPages(links.pages).map(a => {
                return this.crawl(a)
            }))
            .then(()=>{ return this.pages })
        })
    }

    fetch(url){
        return new Promise((res, rej) => {
            fetch(url)
            .then(res => res.text())
            .then(text => { res(text) })
            .catch(err => { rej(err) })
        })
    }

    extractLinks(text){
        let pages = text.match(/\<a[^\>]*?href\=(\"|\')[^\"\']*?(\"|\')/g)
        let lhrefs = text.match(/\<link[^\>]*?href\=(\"|\')[^\"\']*?(\"|\')/g)
        let srcs = text.match(/src\=(\"|\')[^\"\']*?(\"|\')/g)

        pages = (pages) ? pages : []
        lhrefs = (lhrefs) ? lhrefs : []
        srcs = (srcs) ? srcs : []
        let assets = lhrefs.concat(srcs)

        return {
            pages: this.getLinksFromMatches(pages),
            assets: this.getLinksFromMatches(assets)
        }
    }
    getLinksFromMatches(matches){
        if(!matches) return []
        let links = []
        matches.map(match => {
            let link = match.match(/(href|src)\=(\"|\')([^\"\']*?)(\"|\')/)
            if(link.length && link[3]) {
                link = link[3]
                if(link.match('http') && !link.match(this.host)) return false
                links.push(link)
            }
        })
        return links
    }
    newPages(pages){
        let newPages = []
        pages.map(page => {
            if(!this.pages.includes(page)) {
                newPages.push(page)
                this.pages.push(page)
            }
        })
        return newPages
    }
    newAssets(assets){
        let newAssets = []
        assets.map(asset => {
            if(!this.assets.includes(asset)) {
                newAssets.push(asset)
                this.assets.push(asset)
            }
        })
        return newAssets
    }

}
