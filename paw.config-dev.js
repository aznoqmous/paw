
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
                './paw/register-dev.js'
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
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
            ]
        }
    }
]
