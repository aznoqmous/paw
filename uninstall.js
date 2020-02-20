const fs = require('fs-extra')
const process = require('process')
const fss = require('fs')

let cwd = process.env.INIT_CWD
let configFile = `${cwd}/paw/config.json`
let pawDirectory = `${cwd}/paw`
let packageFile = `${cwd}/package.json`

const config = require(configFile)
const packageJson = require(packageFile)

let publicDirectory = config.publicDirectory
let publicFiles = [
    'register.js',
    'sw.js',
    'manifest.json',
    'icon-192.png',
    'icon-512.png'
]

removePublicDirectory()
.then(()=>{
    return removePawDirectory()
})
.then(()=>{
    return removePawConfig()
})
.then(()=>{
    return removeNpmScripts()
})
.then(()=>{
    console.log('Uninstall completed')
})

function removePublicDirectory(){
    return Promise.all(
        publicFiles.map(file => {
            return fs.remove(`${cwd}${publicDirectory}/${file}`)
                .then(()=>{ console.log(`${file} erased`) })
        })
    )
        .then(()=>{ console.log('public directory cleared') })
}

function removePawDirectory(){
    return fs.remove(`${pawDirectory}`)
        .then(()=>{ console.log(`paw directory removed`) })
}

function removePawConfig(){
    return fs.remove(`${cwd}/paw.config.js`)
        .then(()=>{ console.log(`paw.config.js removed`)})
}

function removeNpmScripts(){
    let keys = [...Object.keys(packageJson.scripts)].filter(script => {
        return /paw/.test(script)
    })
    keys.map(key => {
        delete packageJson.scripts[key]
    })
    return fs.writeJson(packageFile, packageJson, {spaces: 4})
    .then(()=>{ console.log('paw scripts removed') })
}
