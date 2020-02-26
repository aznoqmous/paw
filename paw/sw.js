import {SWrapper} from 'paw'
import config from './config.json'
// This file is processed during installation only

let sw = new SWrapper(self, config)
let router = sw.router

router.json('/paw/routes', ()=>{
    return router.routes
})

router.route('/').setStrategyNetwork()


router.route('/paw/test', ()=>{
    router.notify('test')
})

router.route('/paw/{id}', (e, id)=>{
    router.notify(`${id}`)
})

router.route('/paw', (e)=>{
    if(e.post) return JSON.stringify(e.data)
    else return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>PAW</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <script src="/node_modules/paw/dist/tester.js"></script>

        <link rel="manifest" href="/manifest.json">
        <script src="/register.js"></script>

    </head>
    <body class="container">
        <h1>paw</h1>
        <h2>Routed from your paw/router.js</h2>
        <ul>
            <li><a href="/paw/status">custom <code>online/offline</code> callback then redirect</a></li>
            <li><a href="/paw/routes">list registered routes</a></li>

        </ul>

        <div id="routeTesterContainer"></div>
    </body>
    </html>
    `
})


router.route('/paw/routes', ()=>{
    return router.routes.map(route => {
        return route.path + '<br>'
    })
})

router.json('/network', ()=>{
    return {
        foo: "bar"
    }
}).setStrategyNetwork()

router.offline('/paw/status', ()=>{
    sw.message('Youre offline')
})
router.online('/paw/status', ()=>{
    sw.message('Youre online')
})
