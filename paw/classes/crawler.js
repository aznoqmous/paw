export default class Crawler {

    constructor(host, config){
        config = Object.assign({
            host: host,
            url: null,
            pages: [],
            assets: [],

            //callbacks
            onNewUrl: null

        }, config)
        for(let key in config) this[key] = config[key]
    }

    crawlPageAssets(url){
        this.newPages([url])
        return this.fetch(url)
        .then((text)=>{
            let links = this.extractLinks(text)
            this.newAssets(links.assets)
            return links.assets
        })
    }

    // full crawl - stop when no new url if found
    crawl(url){
        return this.fetch(url)
        .then((text)=>{
            let links = this.extractLinks(text)
            this.newAssets(links.assets)
            return Promise.allSettled(this.newPages(links.pages).map(a => {
                return this.crawl(a)
            }))
            .then(()=>{ return this.pages })
        })
    }

    fetch(url){
        return new Promise((res, rej) => {
            fetch(url)
            .then(response => {
                if(!response.ok) rej(response.status)
                response.text()
                .then(text => { res(text) })
            })
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
                if(!link.match(/^http/)) {
                    if(link[0] != '/') link = `https://${this.host}/${link}`
                    else link = `https://${this.host}${link}`
                }
                if(link.match(/javascript\:history/)) return false
                let url = new URL(link)
                if(url.hostname != this.host) return false
                if(url) links.push(url.pathname)
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
                if(this.onNewUrl) this.onNewUrl(page, this)
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
                if(this.onNewUrl) this.onNewUrl(asset, this)
            }
        })
        return newAssets
    }
}
