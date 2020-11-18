/* jshint esversion: 6 */

const webpack = require('webpack');
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Outputs css as a string instead of a file
          'to-string-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js'

    }
  },
};
