import RegisterWrapper from './classes/register-wrapper'
import config from './config.json'

let rw = new RegisterWrapper(config)

// document.addEventListener('DOMContentLoaded', ()=>{
//     rw.sw({sync: 'form-submissions'})
//     .then(res => console.log(res))
//     .catch(err => console.error(err))
// })

window.addEventListener('load', ()=>{ console.log('load') })
window.addEventListener('beforeunload', ()=>{ console.log('beforeunload') })
