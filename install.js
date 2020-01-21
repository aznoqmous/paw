const path = require('path')
const copyfiles = require('copyfiles')
const process = require('process')

let dir = path.resolve(__dirname, '.')
let cwd = process.env.INIT_CWD
cwd = path.resolve(cwd, '.')

console.log(`Install PAW inside ${cwd}`)
copyfiles([
  `./paw.config.js`,
  `./src/*`,
  `./src/*/*`,
  `${cwd}/`
], '', ()=>{ console.log('PAW Installation completed') })
