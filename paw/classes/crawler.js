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
        console.log(this)
    }

    crawlPageAssets(url=null) {
        url = ( url ) ? url : this.host
        return this.fetch(url)
            .then((text) => {
                this.newPages([url])
                let links = this.extractLinks(url, text)
                this.newAssets(links.assets)
                return links.assets
            })
    }

    // full crawl - stop when no new url if found
    crawl(url=null) {
        url = ( url ) ? url : this.host
        return this.fetch(url)
            .then((text) => {
                let links = this.extractLinks(url, text)

                this.newAssets(links.assets)
                let pages = this.newPages(links.pages)

                return Promise.allSettled(pages.map(a => {
                    return this.crawl(a)
                }))
                    .then(() => {
                        return this
                    })
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
                .catch(err => {
                    this.errors.push(url)
                    rej({
                        error: err,
                        url: url
                    })
                })
        })
    }

    extractLinks(baseUrl, text) {
        let pages = this.matchAll(/\<a[^>]*?href\=[\"|\']([^\"\']*?)[\"|\']/gs, text)
        let lhrefs = this.matchAll(/\<link[^>]*?href\=[\"|\']([^\"\']*?)[\"|\']/gs, text)
        let srcs = this.matchAll(/src\=[\"|\']([^\"\']*?)[\"|\']/gs, text)

        // PAGES
        pages = (pages) ? [...pages] : []

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
        let res = text.matchAll(pattern, text)
        res = [...res]
        return res.map(re => {
            return re.filter((value, i) => {
                return i == 1
            })
        }).flat()
    }

    newPages(pages) {
        let newPages = []
        pages.map(page => {
            let index = `${page.origin}${page.pathname}`
            if (!Object.keys(this.pages).includes(index)) {
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
            if (!Object.keys(this.assets).includes(index)) {
                newAssets.push(asset)
                this.assets[index] = asset
                if (this.onNewUrl) this.onNewUrl(asset, this)
            }
        })
        return newAssets
    }
}
