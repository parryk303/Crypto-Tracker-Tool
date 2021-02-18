const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './client/app.jsx',

  output: {
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist')
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: 'main.[chunkhash].css' }),
  ],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: [path.resolve(__dirname, 'client')],
        loader: 'babel-loader'
      },
      {
        test: /.css$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',

            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
};