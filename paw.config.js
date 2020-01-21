const path = require('path')

module.exports = [
  {
    entry: {
      path: [
        './src/sw.js'
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
        './src/register.js'
      ]
    },
    output: {
      path: path.resolve(__dirname, "."),
      filename: "register.js"
    }
  }
]
