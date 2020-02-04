const path = require('path')

module.exports = [
  {
    entry: {
      path: [
        './paw/sw-dev.js'
      ]
    },
    output: {
      path: path.resolve(__dirname, "."),
      filename: "sw.js"
    }
  },
  {
    entry: {
      path: [
        './paw/register-dev.js'
      ]
    },
    output: {
      path: path.resolve(__dirname, "."),
      filename: "register.js"
    }
  }
]
