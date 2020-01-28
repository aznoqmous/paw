const path = require('path')

module.exports = [
  {
    entry: {
      path: [
        './node_modules/paw/src/tester.js'
      ]
    },
    output: {
      path: path.resolve(__dirname, "."),
      filename: "./node_modules/paw/dist/tester.js"
    }
  }
]
