const HtmlWebpackPlugin = require('html-webpack-plugin')
require('webpack')

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  entry: ['./src/index.tsx'],
  performance: {
    hints: 'warning'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.(woff|woff2|ttf)(\?.*)?$/,
        exclude: /(node_modules)/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.svg(\?.*)?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false
            }
          },
          'url-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      scriptLoading: 'defer',
      template: './public/index.html',
      title: 'InvestaX',
      favicon: './public/favicon.ico'
    })
  ]
}
