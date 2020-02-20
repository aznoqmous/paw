const fs = require('fs-extra')
const process = require('process')

let cwd = process.env.INIT_CWD
let configFile = `${cwd}/paw/config.json`

const config = require(configFile)

let pawDirectory = `${cwd}/paw`

let publicDirectory = config.publicDirectory
let publicFiles = [
    'register.js',
    'sw.js',
    'manifest.json',
    'icon-*.png'
]

console.log('cwd', cwd)
console.log('config', config)
console.log('pawDirectory', pawDirectory)
console.log('publicDirectory', publicDirectory)

// Promise.all(
//     fs.remove(`${pawDirectory}`),
//     Promise.allSettled(
//         publicFiles.map(file => {
//             fs.remove(`${publicDirectory}/${file}`, err => { console.error(err) })
//         })
//     )
// )
