export default class Crawler {

    constructor(host, config) {
        config = Object.assign({
            host: host,
            url: null,

            pages: [],
            assets: [],

            errors: [],

            size: [],

            bgFetch: null,

            //callbacks
            onNewUrl: null,

            allowedExtensions: ['css', 'js', 'jpg', 'jpeg', 'png', 'html', 'php', 'icon', 'json', 'pdf']

        }, config)
        for (let key in config) this[key] = config[key]
        console.log(this)
    }

    crawlPageAssets(url) {
        return this.fetch(url)
            .then((text) => {
                this.newPages([url])
                let links = this.extractLinks(text)
                this.newAssets(links.assets)
                return links.assets
            })
    }

    // full crawl - stop when no new url if found
    crawl(url) {
        return this.fetch(url)
            .then((text) => {
                let links = this.extractLinks(text)

                this.newAssets(links.assets)
                let pages = this.newPages(links.pages)

                return Promise.allSettled(pages.map(a => {
                    return this.crawl(a)
                }))
                    .then(() => {
                        return {
                            pages: this.pages,
                            assets: this.assets,
                            errors: this.errors
                        }
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

    extractLinks(text) {
        let pages = text.match(/\<a[^\>]*?href\=[\"|\'][^\"\']*?[\"|\']/g)
        let lhrefs = text.match(/\<link[^\>]*?href\=[\"|\'][^\"\']*?[\"|\']/g)
        let srcs = text.match(/src\=[\"|\'][^\"\']*?[\"|\']/g)

        pages = (pages) ? pages : []
        lhrefs = (lhrefs) ? lhrefs : []
        srcs = (srcs) ? srcs : []
        let assets = lhrefs.concat(srcs)

        return {
            pages: this.getLinksFromMatches(pages),
            assets: this.getLinksFromMatches(assets)
        }
    }

    getLinksFromMatches(matches) {
        if (!matches) return []
        let links = []

        matches.map(match => {
            let link = match.match(/(href|src)\=[\"|\']([^\"\']*?)[\"|\']/)

            if (link.length && link[2]) {
                link = link[2]

                if (!/^http/.test(link)) {
                    let ext = link.match(/[^\/]*?[\.]([[a-z][^\.]]*?)$/)
                    if(!ext) ext = link.match(/[^\/]*?[\.]([[a-z][^\.]]*?)\//)

                    ext = (ext && ext.length) ? ext[1] : false

                    if(ext && !this.allowedExtensions.includes(ext)) return false;

                    if(/^\//.test(link)) link = `https://${this.host}${link}` // ex: /bloublou.js
                    else link = `https://${this.host}/${link}` // ex: bloublou.js
                }

                if (link.match(/javascript\:history/)) return false

                let url = new URL(link)

                if (url.hostname != this.host) return false

                if (url) links.push(url.pathname)
            }
        })
        return links
    }

    newPages(pages) {
        let newPages = []
        pages.map(page => {
            if (!this.pages.includes(page)) {
                newPages.push(page)
                this.pages.push(page)
                if (this.onNewUrl) this.onNewUrl(page, this)
            }
        })
        return newPages
    }

    newAssets(assets) {
        let newAssets = []
        assets.map(asset => {
            if (!this.assets.includes(asset)) {
                newAssets.push(asset)
                this.assets.push(asset)
                if (this.onNewUrl) this.onNewUrl(asset, this)
            }
        })
        return newAssets
    }
}
