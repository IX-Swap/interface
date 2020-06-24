const { override, fixBabelImports, addWebpackResolve } = require('customize-cra')
const path = require('path')

module.exports = override(
  fixBabelImports('core', {
    libraryName: '@material-ui/core',
    // Use "'libraryDirectory': ''," if your bundler does not support ES modules
    libraryDirectory: 'esm',
    camel2DashComponentName: false
  }),
  fixBabelImports('icons', {
    libraryName: '@material-ui/icons',
    // Use "'libraryDirectory': ''," if your bundler does not support ES modules
    libraryDirectory: 'esm',
    camel2DashComponentName: false
  }),
  // addWebpackModuleRule({
  //   test: /\.(ts|tsx)$/,
  //   loader: 'babel-loader'
  // }),
  addWebpackResolve({
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
      'node_modules'
    ]
  })
)
