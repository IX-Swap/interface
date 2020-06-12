const { override, fixBabelImports } = require('customize-cra');

console.log('i am here i will fix');

module.exports = override(
  fixBabelImports('core', {
    libraryName: '@material-ui/core',
    // Use "'libraryDirectory': ''," if your bundler does not support ES modules
    libraryDirectory: 'esm',
    camel2DashComponentName: false,
  }),
  fixBabelImports('icons', {
    libraryName: '@material-ui/icons',
    // Use "'libraryDirectory': ''," if your bundler does not support ES modules
    libraryDirectory: 'esm',
    camel2DashComponentName: false,
  })
);
