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
    'icon-192.png',
    'icon-512.png'
]

console.log('paw directory', pawDirectory)
console.log('public directory', publicDirectory)

Promise.all(
    fs.remove(`${pawDirectory}`)
    .then(()=>{ console.log(`${pawDirectory} erased`) }),
    Promise.all(
        publicFiles.map(file => {
            fs.remove(`${cwd}${publicDirectory}/${file}`)
            .then(()=>{ console.log(`${file} erased`) })
        })
    )
    .then(()=>{ console.log('public directory cleared') })
)
.then(()=>{ console.log('Uninstall completed') })
