const path = require('path')

module.exports = [
    {
        entry: {
            path: [
                './paw/index.js'
            ]
        },
        output: {
            path: path.resolve(__dirname, "."),
            filename: "./dist/main.js"
        },
        module: {
            rules: [
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
