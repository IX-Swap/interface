const {
  override,
  addWebpackResolve,
  addWebpackPlugin
} = require('customize-cra')
const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const version = JSON.parse(fs.readFileSync('./package.json')).version

if (version === undefined) {
  throw new Error('Failded to get the version')
}

module.exports = override(
  addWebpackResolve({
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
      'node_modules'
    ]
  }),
  addWebpackPlugin(
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(version)
    })
  )
)
