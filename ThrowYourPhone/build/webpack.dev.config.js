var path = require('path');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  output: {
    filename: 'scripts.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      hash: true,
      inject: true
    })
  ]
});
