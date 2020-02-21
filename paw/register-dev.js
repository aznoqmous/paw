import RegisterWrapper from './classes/register-wrapper'
import config from './config.json'

window.rw = new RegisterWrapper(config)

document.addEventListener('DOMContentLoaded', ()=>{
    let installBtn = document.createElement('span')
    installBtn.innerHTML = 'install'
    document.body.appendChild(installBtn)
    installBtn.addEventListener('click', ()=>{
        document.body.style.opacity = 0.2
        rw.autoInstall()
        .finally(()=>{
            rw.loaded()
        })
    })
})
