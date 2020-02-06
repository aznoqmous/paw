import RegisterWrapper from './classes/register-wrapper'
import config from './config.json'

window.rw = new RegisterWrapper(config)

window.addEventListener('load', ()=>{ console.log('load') })
window.addEventListener('beforeunload', ()=>{ console.log('beforeunload') })
