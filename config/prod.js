const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = require('./common')

config.mode = 'production'
config.stats = 'verbose'

config.output = {
  path: path.join(process.cwd(), 'build'),
  publicPath: '/',
  filename: 'js/[name].[chunkhash].js'
}

config.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: 'json'
  })
)

config.optimization = {
  minimize: true
}

module.exports = config
