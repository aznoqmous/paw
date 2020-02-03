const prompt = require('prompt')
const path = require('path')
const process = require('process')
const fs = require('fs')

let cwd = process.env.INIT_CWD
let configFile = `${cwd}/paw/config.json`

console.log(`PAW config setup ${configFile} :`)
prompt.get([{
    name: 'name',
}], (err, res)=>{
  let config = {
    name: 'paw',
    short_name: 'paw',
    theme_color: "#fff",
    background_color: "#474747",
    display: "standalone",
    scope: "/",
    orientation: "portrait",
    start_url: "/",
    charset: "utf-8",
    icons: [
      "icon-192.png",
      "icon-512.png"
    ],
    badge: "icon-192.png",
    cacheName: "paw-cache",
    privateKey: "4AtF_NBS2jXcgQNEdQmOFLMeqA2ZWylX-_PhIlOq4xE",
    publicKey: "BE-bdUE6scWTi0HQzt3PujQcSDeCK0KKz-wCkq-XIfTIXhmawwI-dTUNZAZEH_X5rkDrBqbA71wba2CsAm7gyDA",
    strategy: "cache",
    debug: false,
    staticPages: [ "/" ],
    offlinePage: null,
    notifications: true,
    messageTimeOut: 3000,
    messagePosition: 'bottom',
    updateText: 'A new update is available, click on this message to <strong>update</strong>'
  }
  for(let key in res) config[key] = res[key]

  fs.writeFile(configFile, JSON.stringify(config, null, 4), (err)=>{
    if(!err) console.log('PAW config setup complete')
    else console.log(err)
  })
})
