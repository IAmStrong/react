const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules\/(?!(font-awesome)\/).*/,
                loader: 'url-loader'
            }, {
                test: /\.ico$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    }
};
