var webpack = require('webpack');
var path = require('path');

var INPUT_DIR = path.resolve(__dirname, 'client');
var BUILD_DIR = path.resolve(__dirname, 'public/javascripts');

var config = {
  entry: INPUT_DIR + '/root.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'client.bundle.js'
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'client'),
      'node_modules'
    ]
  },
  devtool: 'source-map'
};

module.exports = config;
