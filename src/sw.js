import {SWrapper} from 'paw'
import config from './config.json'
// This file is processed during installation only

let sw = new SWrapper(self, config)

sw.redirect('/', '/pwa');

sw.route('/paw', ()=>{
    return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>PAW</title>
        <link rel="manifest" href="/manifest.json">
        <script src="/register.js"></script>
    </head>
    <body>
        <h1>paw</h1>
        <h2>Routed from your src/sw.js</h2>
        <ul>
            <li><a href="/status">custom <code>online/offline</code> callback then redirect</a></li>
            <li><a href="/network">custom json response with strategy <code>network</code></a></li>
            <li><a href="/cache">custom json response with strategy <code>cache</code></a></li>
        </ul>
    </body>
    </html>
    `
})

sw.json('/network', ()=>{
    return {
        name: "ouiahazd"
    }
}, {
    strategy: 'network'
})

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

// sw.notify('Installation complete !')
