# aznoqmous/paw

## How to use
Note that PAW installation will fail if no `package.json` is found in your current project.  
So a first step if to run `npm init` if it's not the case.

`npm install aznoqmous\paw`  


Once `paw` is installed, you'll notice the following files added to your project :

```sh
your_project
├── src
│   ├── config.json # paw config file     - passed to both register and sw
│   ├── register.js # register file       - register your service worker
│   └── sw.js       # sw file             - service worker definition
├── icon-*.png      # icon file           - needed, use your own
├── manifest.json   # manifest file       - needed, modify at will
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

## Next
- Build `config.json` during install (prompt in CLI)
- Regenerate `manifest.json` from `config.json` on webpack build
