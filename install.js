const path = require('path')
const copyfiles = require('copyfiles')
const process = require('process')
const npmAddScript = require('npm-add-script')

let dir = path.resolve(__dirname, '.')
let cwd = process.env.INIT_CWD
cwd = path.resolve(cwd, '.')

console.log(`Installing PAW...`)

copyfiles([
  './manifest.json',
  './paw.config.js',
  './icon-*.png',
  './src/register.js',
  './src/sw.js',
  './src/config.json',
  `${cwd}/`
], '', ()=>{
  console.log('PAW Installation completed')
  process.chdir(cwd)
  npmAddScript({key: 'paw', value: 'webpack --config paw.config.js --mode production'})
  npmAddScript({key: 'paw:dev', value: 'webpack --config paw.config.js --mode development'})
  npmAddScript({key: 'paw:watch', value: 'webpack --config paw.config.js --mode development --watch'})
  console.log(`PAW scripts has been added inside ${cwd}/package.json`)
})
