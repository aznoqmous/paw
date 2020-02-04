import SWrapper from './classes/sw-wrapper'
import config from './config.json'
// This file is processed during installation only

let sw = new SWrapper(self, config)

sw.route('/').setStrategyNetwork()

// sw.redirect('/', '/paw');
sw.route('/{path}', (e, path)=>{
    console.log(`${path}`)
})
sw.route('/paw/test', ()=>{
    sw.notify('test')
})
sw.route('/paw/{id}', (e, id)=>{
    sw.notify(`${id}`)
})

sw.route('/paw', (e)=>{
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
sw.json('/paw/routes', ()=>{
    return sw.routes
})

sw.json('/network', ()=>{
    return {
        foo: "bar"
    }
}).setStrategyNetwork()

sw.json('/cache', ()=>{
    return 'test'
})

sw.online('/status', ()=>{
    sw.notify('You are online')
    return sw.redirectResponse('/')
})

sw.offline('/status', ()=>{
    sw.notify('You are offline')
    return sw.redirectResponse('/')
})
