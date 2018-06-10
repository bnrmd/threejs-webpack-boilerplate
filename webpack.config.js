const  path = require('path');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "./dist/",
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devtool: 'eval',
    devServer: {
        publicPath: "/",
        contentBase: "./dist",
        hot: true,
        watchContentBase: true
    }
}
