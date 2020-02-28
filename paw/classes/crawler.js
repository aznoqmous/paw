export default class Crawler {

    constructor(host, config) {
        config = Object.assign({
            host: new URL(host),
            url: host,

            pages: {},
            assets: {},

            errors: [],

            size: [],

            bgFetch: null,

            //callbacks
            onNewUrl: null,
            onPageCrawled: null,

            timeout: 10 * 1000,

            allowedAssets: ['css', 'js', 'jpg', 'jpeg', 'svg', 'png', 'ico', 'json', 'pdf', 'xml', 'txt'],
            allowedPages: ['html', 'php']

        }, config)

        for (let key in config) this[key] = config[key]
    }

    crawlPageAssets(url=null) {
        try{
            url = new URL(url)
        }
        catch{
            url = ( url ) ? url : this.host
        }
        return this.fetch(url)
            .then((res) => {
                this.newPages([url])
                let links = this.extractLinks(this.host, res.text)
                return this.newAssets(links.assets)
            })
    }

    // full crawl - stop when no new url if found
    crawl(url=null) {
        url = ( url ) ? url : this.host
        return this.fetch(url)
            .then((res) => {
                let links = this.extractLinks(url, res.text)

                let pages = this.newPages(links.pages)
                let assets = this.newAssets(links.assets)

                if(this.onPageCrawled) this.onPageCrawled(url, pages, assets)
                if(!pages.length) return Promise.resolve()
                return Promise.allSettled(pages.map(a => {
                    return this.crawl(a)
                }))
            })
            .catch(err => {
                this.errors[url] = err

                delete this.pages[url]

                return {
                    error: err,
                    url: url
                }
            })
    }

    fetch(url) {
        let start = Date.now()
        let ended = false
        return new Promise((res, rej) => {
            setTimeout(()=>{
                if(ended) return false
                console.log({
                    url: url.pathname,
                    time: `took more than ${this.timeout}ms`
                })
                rej({
                    url: url.pathname,
                    time: `took more than ${this.timeout}ms`
                })
                ended = true
            }, this.timeout)
            fetch(url)
                .then(response => {
                    let time = Date.now() - start
                    if(ended) return false;
                    ended = true
                    if (!response.ok) rej(response.status)
                    response.text()
                        .then(text => {
                            console.log({
                                url: url.pathname,
                                time: time
                            })
                            res({
                                url: url,
                                time: time,
                                text: text
                            })

                        })
                })
                .catch(err => { rej(err) })
        })
    }

    extractLinks(baseUrl, text) {
        let base = text.match(/\<base[^>]*?href\=[\"|\']([^\"\']*?)[\"|\']/)

        if(base.length) {
            baseUrl = new URL(base[1])
        }

        let pages = this.matchAll(/\<a[^>]*?href\=[\"|\']([^\"\']*?)[\"|\']/g, text)
        let lhrefs = this.matchAll(/\<link[^>]*?href\=[\"|\']([^\"\']*?)[\"|\']/g, text)
        let srcs = this.matchAll(/src\=[\"|\']([^\"\']*?)[\"|\']/g, text)

        // PAGES
        pages = pages.filter(page => {
            if(! /\./.test(page)) return true
            return this.allowedPages.filter(ext => {
                let splitted = page.split('/')
                let baseName = splitted[splitted.length-1]
                if(!/\./.test(baseName)) return true // no ext
                return new RegExp(`\.${ext}`).test( baseName ) // allowed ext
            }).length > 0
        })

        pages = pages.map(page => {
            try {
                page = new URL(page)
            }
            catch (e) {
                page = new URL(page, this.host)
            }
            return page
        } )
        pages = pages.filter(page => {
            return page.host == this.host.host
        })


        // ASSETS
        lhrefs = (lhrefs) ? [...lhrefs] : []
        srcs = (srcs) ? [...srcs] : []

        let assets = lhrefs.concat(srcs)
        assets = assets.filter(asset => {
            if(! /\./.test(asset)) return false
            return this.allowedAssets.filter(ext => {
                return new RegExp(`\.${ext}$`).test(asset)
            }).length > 0
        })
        assets = assets.map(asset => {
            if(/^\//.test(asset)) return new URL(asset, this.host)
            return new URL(asset, baseUrl)
        } )
        assets = assets.filter(asset => {
            return asset.host == baseUrl.host
        })

        return {
            pages: pages,
            assets: assets
        }
    }

    matchAll(pattern, text){
        let matches = [...text.matchAll(pattern)]
        return matches.map(m => m[1])
    }

    newPages(pages) {
        let newPages = []
        pages.map(page => {
            let index = `${page.origin}${page.pathname}`
            if (
                !Object.keys(this.pages).includes(index)
                && !Object.keys(this.errors).includes(page)
            ) {
                newPages.push(page)
                this.pages[index] = page
                if (this.onNewUrl) this.onNewUrl(page, this)
            }
        })
        return newPages
    }

    newAssets(assets) {
        let newAssets = []
        assets.map(asset => {
            let index = `${asset.origin}${asset.pathname}`
            if (
                !Object.keys(this.assets).includes(index)
                && !Object.keys(this.errors).includes(asset)
            ) {
                newAssets.push(asset)
                this.assets[index] = asset
                if (this.onNewUrl) this.onNewUrl(asset, this)
            }
        })
        return newAssets
    }
}
