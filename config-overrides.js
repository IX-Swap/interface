const {
  override,
  fixBabelImports,
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

console.log(version)

module.exports = override(
  fixBabelImports('core', {
    libraryName: '@material-ui/core',
    libraryDirectory: 'esm',
    camel2DashComponentName: false
  }),
  fixBabelImports('icons', {
    libraryName: '@material-ui/icons',
    libraryDirectory: 'esm',
    camel2DashComponentName: false
  }),
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
