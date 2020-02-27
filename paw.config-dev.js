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
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
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
                './paw/register-dev.js'
            ]
        },
        output: {
            path: path.resolve(__dirname, "."),
            filename: "register.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
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
