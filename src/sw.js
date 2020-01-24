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
    <strong>paw</a>
    <p>Routed from your src/sw.js</p>
    <a href="/status">network status</a>
  </body>
  </html>
  `
}, {
  type: 'html'
})

sw.route('/test', ()=>{
  return JSON.stringify('test')
}, {type: 'json'})

sw.online('/status', ()=>{
  return JSON.stringify('online')
}, {type: 'json'})

sw.offline('/status', ()=>{
  sw.notify('You are offline')
  return JSON.stringify('offline')
}, {type: 'json'})

sw.notify('Installation complete !')
