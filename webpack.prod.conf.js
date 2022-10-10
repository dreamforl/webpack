let config = require('./config')

const { merge } = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.config')
module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(config.build.env),
    }),
  ],
  devtool: 'nosources-source-map',
})
