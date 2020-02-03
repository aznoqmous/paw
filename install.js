const path = require('path')
const copyfiles = require('copyfiles')
const process = require('process')
const npmAddScript = require('npm-add-script')

let dir = path.resolve(__dirname, '.')
let cwd = process.env.INIT_CWD
let installedPath = "./node_modules/paw"
cwd = path.resolve(cwd, '.')

console.log(`Installing PAW...`)

copyfiles([
  './paw.config.js',
  './icon-*.png',
  './paw/register.js',
  './paw/sw.js',
  './paw/config.json',
  `${cwd}/`
], '', ()=>{
  console.log('PAW Installation completed')
  process.chdir(cwd)
  npmAddScript({key: 'paw', value: `node ${installedPath}/build-manifest.js && webpack --config paw.config.js --mode production`})
  npmAddScript({key: 'paw:dev', value: `node ${installedPath}/build-manifest.js && webpack --config paw.config.js --mode development`})
  npmAddScript({key: 'paw:watch', value: `node ${installedPath}/build-manifest.js && webpack --config paw.config.js --mode development --watch`})
  npmAddScript({key: 'paw:config', value: `node ${installedPath}/setup-config.js && node ${installedPath}/build-manifest.js`})
  npmAddScript({key: 'paw:manifest', value: `node ${installedPath}/build-manifest.js`})
  console.log(`PAW scripts has been added inside ${cwd}/package.json`)
})
