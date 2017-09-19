var webpack = require('webpack');
var path = require('path');

var INPUT_DIR = path.resolve(__dirname, 'client');
var BUILD_DIR = path.resolve(__dirname, 'public');

var config = {
    entry: INPUT_DIR + '/container.jsx',
    output: {
        path: BUILD_DIR,
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: [/\.jsx?$/, /\.js?$/],
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map'
};

module.exports = config;
