
const HTMLWebpackPlugin = require('html-webpack-plugin')
var path = require('path');

const WebpackConfig = {
    entry: "./src/index.ts",
    plugins: [
        new HTMLWebpackPlugin({
            template: "src/index.html",
            filename: "index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(tsx?)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'ts-loader'
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname,'src'), 'node_modules'],
        extensions: ['.js','.jsx','.ts','.tsx','.css']
    }
};

module.exports = WebpackConfig;
