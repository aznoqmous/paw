
const path = require('path')

module.exports = [
    {
        entry: {
            path: [
                './paw/sw.js'
            ]
        },
        output: {
            path: path.resolve(__dirname, "."),
            filename: "./sw.js"
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: [/node_modules/],
                    include: [/node_modules\/paw/],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
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
            filename: "./register.js"
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: [/node_modules/],
                    include: [/node_modules\/paw/],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        }
    }
]
