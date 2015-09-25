// jscs:disable

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var writeStats = require('./utils/writeStats');
var CleanPlugin = require('clean-webpack-plugin');
var node_modules = path.resolve(__dirname, '../node_modules');
var strip = require('strip-loader');
var config = require('../src/config');

var relativeAssetsPath = '../static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

var config = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),

  entry: [
    './src/client.js',
  ],

  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', '.jsx', '.js']
  },

  progress: true,

  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: config.appContext + '/dist/',
  },

  module: {
    loaders: [
      {test: /\.svg$/, loader: 'raw'},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')},
      {test: /\.js$/, exclude: /(node_modules)/, loaders: [strip.loader('debug'), 'babel']},
      {test: /\.json$/, loader: 'json-loader' },
    ]
  },

  plugins: [
    new CleanPlugin([relativeAssetsPath]),

    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // set global vars
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new ExtractTextPlugin('app.css', {
        allChunks: true
    }),

    // optimizations
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //       warnings: false
    //     }
    // }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    function() {
      this.plugin('done', function(stats) {
        writeStats.call(this, stats, 'dev');
      });
    },

  ],

}

module.exports = config;
