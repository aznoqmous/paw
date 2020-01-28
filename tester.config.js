const path = require('path')

module.exports = [
  {
    entry: {
      path: [
        './src/tester.js'
      ]
    },
    output: {
      path: path.resolve(__dirname, "."),
      filename: "dist/tester.js"
    }
  }
]
