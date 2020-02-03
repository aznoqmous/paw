# aznoqmous/paw

## Prerequisites
- Your app must be served over `https`
- You must include `manifest.json` and `register.js` to your app head

See Google's [Progressive Web App Checklist](https://developers.google.com/web/progressive-web-apps/checklist) for more about PWA best practices.

## Installation
Note that PAW installation will fail if no `package.json` is found in your current project.  
So a first step if to run `npm init` if it's not the case.

`npm install aznoqmous\paw`  

Once `paw` is installed, you'll notice the following files added to your project :

```sh
your_project
├── src
│   ├── config.json # paw config file     - passed to both register and sw, generate your /manifest.json
│   ├── register.js # register file       - register your service worker
│   └── sw.js       # sw file             - service worker definition
├── icon-*.png      # icon file           - needed, use your own
└── paw.config.js   # paw webpack config  - used to generate final files
```

Aswell as these commands added to your `package.json`  
```json
"paw": "webpack --config paw.config.js --mode production",
"paw:dev": "webpack --config paw.config.js --mode development",
"paw:watch": "webpack --config paw.config.js --mode development --watch"
```
You'll have to run these command to generate `your_project/register.js` and `your_project/sw.js`  
>_You can call npm scripts using `npm run <script>`_

You'll have to add those two lines to your app root page :
```html
...
<link rel="manifest" href="/manifest.json">
<script src="/register.js"></script>
...
```

## How to use
Your `src/sw.js` file must look like this :
```js
import {SWrapper} from 'paw'
import config from './config.json'
// This file is processed during installation only

let sw = new SWrapper(self, config)
```

### Routing
`SWrapper` possess multiple methods which allows you to create custom handling for specified routes.

Routes resolution will match the first bound route, and will continue until no return value has been found.

```js
sw.route(path, callback, config)

sw.route('/my-route', (e)=>{
    return 'HTML Content'
})
sw.route('/my-route/{id}', (e, id)=>{
    return `HTML Content with given id : ${id}`
})

// Will only match when offline
sw.offline('/my-offline-route', (e)=>{
    return 'HTML Content'
})

// Will only match when online
sw.online('/my-online-route', (e)=>{
    return 'HTML Content'
})

// Will always return json
sw.json('/my-json-route', (e)=>{
    return { foo: 'bar' }
})

// redirect '/my-old-route' to '/my-new-route'
sw.route('/my-old-route', (e)=>{
    return sw.redirectResponse('/my-new-route')
})
// also redirect '/my-old-route' to '/my-new-route'
sw.redirect('/my-old-route', '/my-new-route')

```

### Notifications
```js
// Will show a notification
sw.notify(body, title=false)
```

### Deferring data submissions
In order to provide offline functionnalities to your app, you'll have to define how you want to
handle data routes when user has lost connection.

```js
sw.offline('/form-action.html', (e)=>{
    if(Object.entries(e.data).length)
    return sw.defer('form-action', e)
    .then(()=>{
        return 'Your form will be submitted when you get back online !'
    })

})

sw.online('/back-online-route', (e)=>{
    return sw.sync('form-action')
    .then(()=>{
        return 'Welcome back ! Your form has successfully been submitted has you are back online !'
    })
})
```

## Features
### CLI
- Auto installation
- Build `config.json` during install (prompt in CLI)
- Regenerate `manifest.json` from `config.json` on webpack build

### App Features
- Auto ask notifications permission (config.notifications)
- Prompt on available update / on installing - on waiting

### SW.js : controller utility
- Custom routes registration inside `src/sw.js` (available: route, offline, online, json, redirect)
- Custom routes with simplified regexp and capture groups (ex: `/entity/{id}`, `/pages/*`)
- Router fill its fetchEvent input data (accessible when routing via `e.data` or `e.get` and `e.post`)
- Notifications (sw.notify)
- Defer/Sync method to save request and load it later (sw.defer/sw.sync)

## Next
- Network change handling
- Messaging from register.js / sw.js to document
- Separate Router responsability from sw
- Test route at project initialization under `/paw`
- Priority cache -> notify on update
