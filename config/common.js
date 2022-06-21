const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const { generateSprite } = require('./generateSprite')

dotenv.config()

module.exports = {
  context: process.cwd(),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['src', 'node_modules'],
    fallback: {
     "buffer": require.resolve("buffer/"),
      util: require.resolve('util/'),
      url: require.resolve('url'),
      assert: require.resolve('assert'), 
    },
    alias: {
     "buffer": "buffer",
  },
  },
  entry: ['./src/index.tsx'],
  performance: {
    hints: 'warning'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        },
        include: path.resolve(process.cwd(), 'src')
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
      },
      {
        test: /\.(woff|woff2|ttf|otf)(\?.*)?$/,
        exclude: /(node_modules)/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  plugins: [
    {
      apply: compiler => {
        compiler.hooks.compile.tap('Generate SVG Sprite', generateSprite)
      }
    },
    new HtmlWebpackPlugin({
      inject: 'head',
      scriptLoading: 'defer',
      template: './public/index.html',
      title: 'InvestaX',
      favicon: './public/favicon.ico'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
  ],
  watchOptions: {
    ignored: path.resolve('./src/assets/icons/sprite')
  }
}
