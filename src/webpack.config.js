
const path = require('path');

module.exports = {
    entry: './frontend/app.js',
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|backend)/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    }
};