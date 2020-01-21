# PAW

```js
import SWrapper from './sw-wrapper'

let sw = new SWrapper(self)

sw.route('/index.html', ()=>{
  return 'index'
})

sw.online('/test', ()=>{
  return JSON.stringify('offline')
})

sw.offline('/test', ()=>{
  sw.notifiy('You are offline')
  return JSON.stringify('online')
})

sw.notify('Installation complete !')
```
