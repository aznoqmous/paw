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
            <li><a href="/status">custom <code>online/offline</code> callback then redirect</a></li>
            <li><a href="/network">custom json response with strategy <code>network</code></a></li>
            <li><a href="/cache">custom json response with strategy <code>cache</code></a></li>
        </ul>

        <div id="routeTesterContainer"></div>
    </body>
    </html>
    `
})


router.json('/network', ()=>{
    return {
        foo: "bar"
    }
}).setStrategyNetwork()

router.json('/cache', ()=>{
    return 'test'
})

router.online('/status', ()=>{
    router.notify('You are online')
    return router.redirectResponse('/')
})

router.offline('/status', ()=>{
    router.notify('You are offline')
    return router.redirectResponse('/')
})
