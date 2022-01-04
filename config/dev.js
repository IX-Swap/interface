const webpack = require('webpack')
const path = require('path')
const config = require('./common')

config.cache = true
config.mode = 'development'
config.stats = 'normal'

config.output = {
  filename: '[name]-[hash].js',
  publicPath: '/'
}

config.performance = {
  hints: 'error',
  maxEntrypointSize: 15242880,
  maxAssetSize: 15242880
}

config.devServer = {
  port: 3000,
  open: true,
  hot: true,
  compress: false,
  devMiddleware: {
    publicPath: '/',
    stats: 'normal'
  },
  client: {
    logging: 'info'
  },
  static: path.relative(process.cwd(), 'public'),
  historyApiFallback: {
    disableDotRule: true
  }
}

module.exports = { ...config }
