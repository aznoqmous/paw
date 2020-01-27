import {SWrapper} from 'paw'
import config from './config.json'
// This file is processed during installation only

let sw = new SWrapper(self, config)

sw.route('/', ()=>{
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
            <li><a href="/status">custom then redirect</a></li>
            <li><a href="/test">custom json response</a></li>
        </ul>
    </body>
    </html>
    `
})

sw.route('/test', ()=>{
    return JSON.stringify('test')
}, {type: 'json'})

sw.online('/status', ()=>{
    sw.notify('You are online')
    return sw.redirectResponse('/')
})

sw.offline('/status', ()=>{
    sw.notify('You are offline')
    return sw.redirectResponse('/')
})

// sw.notify('Installation complete !')
