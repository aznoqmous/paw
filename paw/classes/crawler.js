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

            allowedAssets: ['css', 'js', 'jpg', 'jpeg', 'svg', 'png', 'ico', 'json', 'pdf', 'xml'],
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
            .then((text) => {
                this.newPages([url])
                let links = this.extractLinks(this.host, text)
                return this.newAssets(links.assets)
            })
    }

    // full crawl - stop when no new url if found
    crawl(url=null) {
        url = ( url ) ? url : this.host
        return this.fetch(url)
            .then((text) => {
                let links = this.extractLinks(url, text)

                let pages = this.newPages(links.pages)
                this.newAssets(links.assets)

                return Promise.allSettled(pages.map(a => {
                    return this.crawl(a)
                }))
            })
            // .then(()=>{
            //     return {
            //         pages: this.pages,
            //         assets: this.assets
            //     }})
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
        return new Promise((res, rej) => {
            fetch(url)
                .then(response => {
                    if (!response.ok) rej(response.status)
                    response.text()
                        .then(text => {
                            res(text)
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
                return new RegExp(`\.${ext}`).test( page.split('/')[0] )
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
            return page.host == baseUrl.host
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
