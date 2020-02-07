const path = require('path')
const process = require('process')
const fs = require('fs')

let cwd = process.env.INIT_CWD
let configFile = `${cwd}/paw/config.json`
cwd = path.resolve(cwd, '../..')
console.log(process.env.INIT_CWD, cwd)

const config = require(configFile)

let manifestFile = `${config.publicDirectory}/manifest.json`

console.log(`Generating manifest.json from ${configFile}...`)

let manifest = {
  name: "",
  short_name: "",
  theme_color: "#fff",
  background_color: "#474747",
  display: "standalone",
  orientation: "portrait",
  scope: "/",
  start_url: "/",
  charset: "utf-8",
  icons: []
}
for(let key in manifest){
    if(config[key]) manifest[key] = config[key]
}

let icons = []
config.icons.map(icon => {
  let size = icon.match(/[0-9]/g).join('')
  icons.push({
    src: icon,
    type: "image/png",
    sizes: `${size}x${size}`
  })
})
icons.sort((a,b)=>{ return (a.src > b.src) ? 1 : -1 })
manifest.icons = []
icons.map(icon => { manifest.icons.push(icon) })


fs.writeFile(manifestFile, JSON.stringify(manifest, null, 4), (err)=>{
  if(err) console.log('Error:', err)
})
