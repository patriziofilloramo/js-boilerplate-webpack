const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

module.exports = merge(common, {
  mode: 'production',
  //   output: {
  //     filename: '[name].[contentHash].bundle.js',
  //     chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
  //     path: path.resolve(__dirname, 'dist'),
  //   },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
    new HtmlWebpackPlugin({
      title: 'Production',
    //   favicon: 'src/assets/images/favicon.ico'
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
    new CleanWebpackPlugin(),
    // new CompressionPlugin({
    //   algorithm: 'brotliCompress', // works only with node 11.7.0 or later
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          'css-loader', //2. Turns css into commonjs
          { loader: 'sass-loader', options: { minimizer: true } }, //1. Turns sass into css
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});
