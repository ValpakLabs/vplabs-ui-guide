// jscs:disable

var path = require('path');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var writeStats = require('./utils/writeStats');
var host = 'localhost';
var port = parseInt(process.env.PORT) + 1 || 3001;
var node_modules = path.resolve(__dirname, '../node_modules');
var config = require('../src/config');

var config = {
  devtool: 'eval',
  context: path.resolve(__dirname, '..'),

  entry: [
    'webpack-hot-middleware/client',
    './src/client.js',
  ],

  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', '.jsx', '.js']
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: config.appContext + '/static/',
  },

  module: {
    loaders: [
      {test: /\.svg$/, loader: 'raw'},
      {test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'},
      {test: /\.js$/, exclude: /(node_modules)/, loaders: ['babel']},
      {test: /\.json$/, loader: 'json-loader' },
    ]
  },

  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.IgnorePlugin(/\.json$/),
    new Webpack.NoErrorsPlugin(),
    new Webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true
    }),

    function() {
      this.plugin('done', function(stats) {
        writeStats.call(this, stats, 'dev');
      });
    },

  ],

}

module.exports = config;
