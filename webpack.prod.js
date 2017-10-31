const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const config = {
    devtool: 'source-map',
    entry: {
        app: './src/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist/build'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('style.css')
    ]
// {
//             test: /\.less$/,
//             exclude: /node_modules/,
//             use: [{
//                 loader: 'style-loader'
//             }, {
//                 loader: 'css-loader'
//             }, {
//                 loader: 'less-loader'
//             }]
//         }, {
//             test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
//             exclude: /node_modules/,
//             loader: 'url-loader'
//         }, {
//             test: /\.ico$/,
//             exclude: /node_modules/,
//             loader: 'file-loader?name=[name].[ext]'
//         }]
//     }
};

module.exports = merge(common, config);
