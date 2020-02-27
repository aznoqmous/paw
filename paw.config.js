const path = require('path')

module.exports = [
    {
        module: {
            test: /\.js$/,
            loaders: ['babel-loader']
        }
    },
    {
        entry: {
            path: [
                './paw/sw.js'
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
                './paw/register.js'
            ]
        },
        output: {
            path: path.resolve(__dirname, "."),
            filename: "register.js"
        }
    }
]
