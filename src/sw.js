import {SWrapper} from 'paw'
import config from './config.json'
// This file is processed during installation only

let sw = new SWrapper(self, config)

sw.route('/', ()=>{
  return 'index'
})

sw.online('/test', ()=>{
  return JSON.stringify('online')
})

sw.offline('/test', ()=>{
  sw.notify('You are offline')
  return JSON.stringify('offline')
})

sw.notify('Installation complete !')
