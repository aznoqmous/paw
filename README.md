# paw

## Introduction

`paw` is a npm package which provide default service worker logic you can easily modify to meet your requirements.

__Current features :__
- Notifications
- In-app messages
- Prompt on available update
- Custom routing
- Requests deferrer


## Prerequisites
- Your app must be served over `https`

See Google's [Progressive Web App Checklist](https://developers.google.com/web/progressive-web-apps/checklist) for more about PWA best practices.

## Installation

Note that PAW installation will fail if no `package.json` is found in your current project.  
So a first step if to run `npm init` if it's not the case.

`npm install aznoqmous\paw`  

Once `paw` is installed, you'll notice the following files added to your project :

```sh
your_project
├── paw
│   ├── config.json # paw config file     - passed to both register and sw, generate your /manifest.json
│   ├── register.js # register file       - register your service worker
│   └── sw.js       # sw file             - service worker definition
├── icon-*.png      # icon file           - needed, use your own
└── paw.config.js   # paw webpack config  - used to generate final files
```

You will also notice some new `paw` scripts available in your `package.json`.

You have to run on of those commands to generate `your_project/register.js` and `your_project/sw.js`  
```sh
# production build
npm run paw

# development build
npm run paw:dev

# watch and run development build on update
npm run paw:watch
```

You'll have to add those two lines to your app root page :
```html
...
<link rel="manifest" href="/manifest.json">
<script src="/register.js"></script>
...
```

## Uninstall
`npm remove paw`


## How to use
Your `paw/sw.js` file must look like this :
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

router.route('/my-route', (event)=>{
    return 'HTML Content'
})
router.route('/my-route/{id}', (e, id)=>{
    return `HTML Content with given id : ${id}`
})

// Will ony match when get - post data are sent
router.data('/my-data-route', (e)=>{})

// Will ony match when post data are sent
router.post('/my-post-route', (e)=>{})

// Will ony match when get data are sent
router.get('/my-get-route', (e)=>{})

// Will only match when offline
router.offline('/my-offline-route', (event)=>{
    return 'HTML Content'
})

// Will only match when online
router.online('/my-online-route', (event)=>{
    return 'HTML Content'
})

// Will always return json
router.json('/my-json-route', (event)=>{
    return { foo: 'bar' }
})

// redirect '/my-old-route' to '/my-new-route'
router.route('/my-old-route', (event)=>{
    return router.redirectResponse('/my-new-route')
})
// also redirect '/my-old-route' to '/my-new-route'
router.redirect('/my-old-route', '/my-new-route')

```

### Accessing fetchEvents data
Every fetch event is prepared with its sent datas which you can easily access when routing :
```js
fetchEvent {
    ...
    data: {
        get: {},
        post: {}
    },
    datas: {
        // get + post
    }
}
```
```js
router.route('/path-with-sent-datas', (e)=>{
    if(e.data && e.data.post && !e.data.post.csrfToken) return 'no csrf token :('
})
```

### Notifications
```js
// Will show a notification
router.notify(body, title=false)
```

### In-App messages
```js
// sw.js
sw.message('in app message content')

// register.js
rw.message('in app message with event').addEventListener('click', ()=>{ /* do something */ })
```

### Deferring data submissions
In order to provide offline functionnalities to your app, you'll have to define how you want to
handle data routes when user has lost connection.

```js
router.offline('/form-action.html', (e)=>{
    if(e.data) return sw.defer('form-action', e)
    .then(()=>{
        return sw.message('your data will be saved when you\'re back online')
    })
})

router.online('/back-online-route', (e)=>{
    return sw.sync('form-action')
    .then(()=>{
        return sw.message('welcome back, your data has been saved !')
    })
})
```

## Features
__CLI__
- Auto install / uninstall
- Build `config.json` during install (prompt in CLI)
- Regenerate `manifest.json` from `config.json` on webpack build

__App Features__
- Auto ask notifications permission (config.notifications)
- Prompt on available update / on installing - on waiting

__SW.js : controller utility__
- Custom routes registration inside `paw/sw.js` (available: route, offline, online, json, redirect)
- Custom routes with simplified regexp and capture groups (ex: `/entity/{id}`, `/pages/*`)
- Router fill its fetchEvent input data (accessible when routing via `e.data` or `e.get` and `e.post`)
- Notifications (rw.notify | sw.notify) and in-app message ( rw.message | sw.message )
- Defer/Sync method to save request and load it later (sw.defer/sw.sync)

## Next
- Ask before auto install + progress | in progress
- Separate Router responsability from sw - router.js | in progress

- Add default callbacks to rw (onDeferred, onSync, onUpdate...)
- Separate messages / implement translations

- Priority cache -> notify on update
- Save crawl errors inside local storage (auto hide/pin broken links)
- Faster install: Crawl via cli, create static site archive then background fetch after sw registration
