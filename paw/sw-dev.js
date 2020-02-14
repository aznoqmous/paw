import SWrapper from './classes/sw-wrapper'
import config from './config.json'
// This file is processed during installation only

let sw = new SWrapper(self, config)
let router = sw.router

router.post('/', (e)=>{
    return sw.defer('form', e).then(()=>{
        sw.message('your data will be saved later')
        return router.redirectResponse('/')
    })
})
router.route('/deferred', ()=>{
    return sw.deferred('form').then((datas)=>{
        return datas.map( deferred => {
                return JSON.stringify(deferred)
        }).join('<br>')
    })
})

// router.route('/{path}', (e, path)=>{
//     console.log(`path matched ${path}`)
// })
router.route('/paw/test', (e)=>{
    return Object.keys(e).map((k,v) => {
        return `${k} - ${JSON.stringify(e[k])}`
    }).join('<br>')

})
router.route('/paw/{id}', (e, id)=>{
    return id
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
        <h2>Routed from your paw/sw.js</h2>
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
router.json('/paw/routes', ()=>{
    return router.routes
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
