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
  </head>
  <body>
    <strong>paw</a>
    <p>Routed from your src/sw.js</p>
    <a href="/status">network status</a>
    <a href="/test">custom json response</a>
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
