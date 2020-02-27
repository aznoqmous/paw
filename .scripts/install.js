const prompts = require('prompts')
const path = require('path')
const process = require('process')
const fs = require('fs')
const copyfiles = require('copyfiles')
const npmAddScript = require('npm-add-script')
const chalk = require('chalk')

let dir = path.resolve(__dirname, '.')
let cwd = process.env.INIT_CWD
let installedPath = "./node_modules/paw"
cwd = path.resolve(cwd, '.')

let defaultConfig = `${dir}/paw/config.json`

console.log(`${chalk.blue("Installing PAW...")}`)

getConfig()
.then(config => {
    return buildWebpackConfig(config.publicDirectory)
    .then(()=>{ return copyPublicFiles(config.publicDirectory) })
    .then(()=>{ return copyPawFiles() })
    .then(()=>{ return writeConfigFile(config) })
})
.then(()=>{
    console.log(`${chalk.blue("Installation completed !")}`)
    console.log('')
    console.log('You can now add the following line to your site <head> (on page you want to update from, in most case, at least your homepage) :')
    console.log(`${chalk.yellow('<link')} rel${chalk.green('="manifest"')} href${chalk.green('="/manifest.json"')}${chalk.yellow('>')} `)
    console.log(`${chalk.yellow('<script')} src${chalk.green('="/register.js"')}${chalk.yellow('></script')}`)
    console.log('')
    console.log(`Run ${chalk.green("npm run paw")} to build manifest and required scripts`)
    console.log('')
    console.log('')
})

function getPublicDir(){
    return prompts({
        type: 'text',
        name: 'publicDir',
        message: `Enter public root folder absolute path inside ${cwd.replace(/\/$/, '')} :`,
        validate: publicDir => (isDir(`${cwd}/${publicDir}`)) ? true : `${publicDir} is not a valid directory`
    })
    .then((res)=>{ return `${res.publicDir}` })
}

function buildWebpackConfig(publicDir){
    let pawConfigFile = './paw.config.js'
    return new Promise((resolve, reject)=>{
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
                        filename: "./${publicDir}/sw.js"
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
                        filename: "./${publicDir}/register.js"
                    }
                }
            ]`,
            (err)=>{
                if(!err) resolve('paw webpack config build')
                else reject(err)
            })
        })
    }

    function copyPublicFiles(publicDir){
        console.log('copy public files ', `${cwd}/${publicDir}`)
        return new Promise(resolve => {
            copyfiles([
                './icon-*.png',
                `${cwd}/${publicDir}`
            ], '', ()=>{
                resolve()
            })
        })
    }

    function copyPawFiles(){
        return new Promise(resolve => {
            copyfiles([
                './paw.config.js',
                './paw/register.js',
                './paw/sw.js',
                './paw/config.json',
                `${cwd}/`
            ], '', ()=>{
                process.chdir(cwd)
                npmAddScript({key: 'paw', value: `node ${installedPath}/.scripts/build-manifest.js && webpack --config paw.config.js --mode production`})
                npmAddScript({key: 'paw:dev', value: `node ${installedPath}/.scripts/build-manifest.js && webpack --config paw.config.js --mode development`})
                npmAddScript({key: 'paw:watch', value: `node ${installedPath}/.scripts/build-manifest.js && webpack --config paw.config.js --mode development --watch`})
                npmAddScript({key: 'paw:manifest', value: `node ${installedPath}/.scripts/build-manifest.js`})
                console.log(`PAW scripts has been added inside ${cwd}/package.json`)
                resolve()
            })
        })
    }

    /*
    BUILD CONFIG FILE
    */
    function getConfig(){
        let cwd = process.env.INIT_CWD
        let configFile = `${cwd}/paw/config.json`
        return prompts([
            {
                type: 'text',
                name: 'name',
                message: 'Name your app : ',
                initial: 'pwa'
            },
            {
                type: 'text',
                name: 'publicDirectory',
                message: `Enter public root folder absolute path inside ${cwd}/ :`,
                validate: publicDirectory => (isDir(`${cwd}/${publicDirectory}`)) ? true : `${cwd}/${publicDirectory} is not a valid directory`
            },
            {
                type: 'toggle',
                name: 'notifications',
                message: 'Do you want to enable notifications ?',
                initial: false,
                active: 'yes',
                inactive: 'no'
            },
            {
                type: 'toggle',
                name: 'autoInstallation',
                message: 'Do you want to enable auto-installation ?',
                initial: false,
                active: 'yes',
                inactive: 'no'
            }
        ])
        .then(res => {
            let config = {
                "name": res.name,
                "short_name": res.name,
                "theme_color": "#fff",
                "background_color": "#474747",
                "overlayColor": "rgba(255,255,255,0.5)",
                "display": "standalone",
                "orientation": "portrait",
                "charset": "utf-8",
                "badge": "icon-192.png",
                "icons": [
                  "icon-192.png",
                  "icon-512.png"
                ],

                "scope": "/",
                "start_url": "/",
                "staticPages": [
                    "/"
                 ],

                "rootDirectory": null,
                "publicDirectory": null,
                "strategy": "network",
                "debug": true,
                "offlinePage": null,
                "notifications": true,
                "autoInstallation": true,

                "privateKey": "4AtF_NBS2jXcgQNEdQmOFLMeqA2ZWylX-_PhIlOq4xE",
                "publicKey": "BE-bdUE6scWTi0HQzt3PujQcSDeCK0KKz-wCkq-XIfTIXhmawwI-dTUNZAZEH_X5rkDrBqbA71wba2CsAm7gyDA",
                "cacheName": "paw-cache",
                "messageTimeOut": 3000,
                "messagePosition": "bottom",
                "updateText": "A new update is available, click on this message to <strong>update</strong>"
            }


            for(let key in res) config[key] = res[key]

            config.rootDirectory = `${cwd}`
            return config
        })
    }

    function writeConfigFile(config){
        let configFile = `${cwd}/paw/config.json`
        return new Promise((resolve, reject)=> {
            fs.writeFile(configFile, JSON.stringify(config, null, 4), (err)=>{
                if(!err) resolve('PAW config setup complete')
                else reject(err)
            })
        })
    }

    function isDir(path){
        return (fs.existsSync(path) && fs.lstatSync(path).isDirectory())
    }
