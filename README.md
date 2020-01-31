# aznoqmous/paw

## Prerequisites
- Your app must be served over `https`
- You must include `manifest.json` and `register.js` to your app head

See Google's [Progressive Web App Checklist](https://developers.google.com/web/progressive-web-apps/checklist) for more about PWA best practices.

## How to use
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

## Features
### CLI
- Auto installation
- Build `config.json` during install (prompt in CLI)
- Regenerate `manifest.json` from `config.json` on webpack build

### sw.js / register.js
- Auto ask notifications permission (config.notifications)
- Prompt on available update / on installing - on waiting
- Custom routes registration inside `src/sw.js` (available: route, offline, online, json, redirect)
- Custom routes with simplified regexp and capture groups (ex: `/entity/{id}`, `/pages/*`)
- Router fill its fetchEvent input data (accessible when routing via `e.data` or `e.get` and `e.post`)
- Notifications

## Next
- Network change handling
- Web Share API
- Messaging from register.js / sw.js to document
- Separate Router responsability from sw
- Test route at project initialization under `/paw`
- Priority cache -> notify on update
