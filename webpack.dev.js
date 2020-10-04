const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
  },
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      favicon: 'src/assets/images/favicon.ico'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          'css-loader', //2. Turns css into commonjs
          { loader: 'sass-loader' }, //1. Turns sass into css
        ],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'images',
          },
        },
      },
    ],
  },
});
