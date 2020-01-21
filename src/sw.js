import SWrapper from './sw-wrapper'
// This file is processed during installation only

let sw = new SWrapper(self)

sw.route('/', ()=>{
  return 'index'
})

sw.online('/test', ()=>{
  return JSON.stringify('offline')
})

sw.offline('/test', ()=>{
  sw.notify('You are offline')
  return JSON.stringify('online')
})

sw.notify('Installation complete !')
