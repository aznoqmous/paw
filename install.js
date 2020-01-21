const path = require('path')
const copy = require('copy')
const process = require('process')

let cwd = path.resolve(__dirname, '.')
console.log('dirname:', __dirname)
console.log('filename:', __filename)
console.log('cwd:', cwd)
console.log('process.cwd:', process.cwd())
