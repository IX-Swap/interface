const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')

const config = require('./common')

config.mode = 'production'
config.stats = 'verbose'
config.devtool = false

config.output = {
  path: path.join(process.cwd(), 'build'),
  publicPath: '/',
  filename: 'js/[name].[chunkhash].js'
}

// config.plugins.push(
//   new BundleAnalyzerPlugin({
//     analyzerMode: 'json'
//   })
// )

config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: 'public/documents',
        to: 'documents'
      },
      {
        from: 'public/datafeeds',
        to: 'datafeeds'
      },
      {
        from: 'public/charting_library',
        to: 'charting_library'
      }
    ]
  })
)

config.optimization = {
  minimize: true
}

module.exports = config
