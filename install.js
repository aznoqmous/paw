const prompt = require('prompt')
const path = require('path')
const process = require('process')
const fs = require('fs')
const copyfiles = require('copyfiles')
const npmAddScript = require('npm-add-script')

let dir = path.resolve(__dirname, '.')
let cwd = process.env.INIT_CWD
let installedPath = "./node_modules/paw"
cwd = path.resolve(cwd, '.')

console.log(`Installing PAW...`)

getPublicDir()
.then(publicDir => {
    buildWebpackConfig(publicDir).then(()=>{
        return copyPawFiles()
    }).then(()=>{
        return getConfig(publicDir).then(config =>{
            return writeConfigFile(config)
        })
    }).then(()=>{
        copyPublicFiles(publicDir)
    })
    .then(()=>{
        console.log('Installation completed')
    })
})

function getPublicDir(){
    return new Promise(res => {
        let publicDir = null
        prompt.get([{
            publicDir: 'Document root folder ( public ) :'
        }], (err, res)=>{
            res(publicDir)
        })
    })
}

function buildWebpackConfig(publicDir){
    return new Promise((res,rej)=>{
        fs.writeFile(pawConfigFile, `
            const path = require('path')

            module.exports = [
                {
                    entry: {
                        path: [
                            './paw/sw.js'
                        ]
                    },
                    output: {
                        path: path.resolve(__dirname, "."),
                        filename: "${publicDir}/sw.js"
                    }
                },
                {
                    entry: {
                        path: [
                            './paw/register.js'
                        ]
                    },
                    output: {
                        path: path.resolve(__dirname, "."),
                        filename: "${publicDir}/register.js"
                    }
                }
            ]`,
            (err)=>{
                if(!err) res('paw webpack config build')
                else rej(err)
        })
    })
}

function copyPublicFiles(publicDir){
    return new Promise(res => {
        copyfiles([
            './icon-*.png',
            publicDir
        ], '', ()=>{
            res()
        })
    })
}

function copyPawFiles(){
    return new Promise(res => {
        copyfiles([
            './paw.config.js',
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
            res()
        })
    })
}

/*
BUILD CONFIG FILE
*/
function getConfig(publicDir){
    return new Promise(res => {
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
                updateText: 'A new update is available, click on this message to <strong>update</strong>',
                publicDirectory: publicDir
            }
            for(let key in res) config[key] = res[key]

            res(config)
        })
    })
}

function writeConfigFile(config){
    return new Promise((res, rej)=> {
        fs.writeFile(configFile, JSON.stringify(config, null, 4), (err)=>{
            if(!err) res('PAW config setup complete')
            else rej(err)
        })
    })
}
