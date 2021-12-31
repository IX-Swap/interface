const webpack = require('webpack')
const path = require('path')
const config = require('./common')

config.output = {
  filename: '[name]-[hash].js',
  publicPath: '/'
}
config.performance = {
  hints: 'error',
  maxEntrypointSize: 15242880,
  maxAssetSize: 15242880
}
config.cache = true
config.mode = 'development'
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
  static: path.relative(process.cwd(), 'build'),
  historyApiFallback: {
    disableDotRule: true
  }
}
config.stats = 'normal'
// config.plugins.push(new ReactRefreshWebpackPlugin())
// config.plugins.push(
//   new webpack.DefinePlugin({
//     __DEV__: true
//   })
// )

module.exports = { ...config }
