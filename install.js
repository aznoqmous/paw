const path = require('path')
const copy = require('copy')

let cwd = path.resolve(__dirname, '.')
console.log('dirname:', __dirname)
console.log('filename:', __filename)
console.log('cwd:', cwd)
console.log('process.chdir:', process.chdir())
console.log('process.cwd:', process.cwd())
