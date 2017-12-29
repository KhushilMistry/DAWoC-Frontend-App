var webpack = require('webpack');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

var DEBUG = !argv.release;

const STYLE_LOADER = 'style-loader/useable',
  CSS_LOADER = DEBUG ? 'css-loader' : 'css-loader?minimize',
  POSTCSS_LOADER = 'postcss-loader?parser=postcss-scss',
  AUTOPREFIXER_LOADER = `autoprefixer-loader?{browsers:${JSON.stringify([
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 30',
    'Firefox >= 38',
    'Explorer >= 10',
    'iOS >= 7',
    'Opera >= 30',
    'Safari >= 8'])}}`,

  PWD = process.env.PWD;

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index.js'
  ],
  output: {
    path: require('path').resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    noParse: /node_modules\/reactstrap-tether\/dist\/tether.js/,
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test   : /\.scss$/,
        exclude: /node_modules/,
        loader : `${STYLE_LOADER}!${CSS_LOADER}!${AUTOPREFIXER_LOADER}!sass-loader`
      },
      {
        test: /\.css$/,
        loader: STYLE_LOADER + '!' + CSS_LOADER + '!' + POSTCSS_LOADER
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      }
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};