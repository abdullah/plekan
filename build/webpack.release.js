var path = require('path')
require('shelljs/global')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env




var version = require('../package.json').version;

baseWebpackConfig.entry = {
  'plekan':'./src/plekan.js',
  'plekanmodules' : './src/core/modules/index.js'
}

var assetsPath = path.join(config.release.assetsRoot, config.release.assetsSubDirectory)

// rm('-rf', assetsPath)
// mkdir('-p', assetsPath)
// cp('-R', 'static/', assetsPath)


var mergeResult = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path:'release',
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  module:{
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  plugins: [
    // new closeEmit(),
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
})


module.exports = mergeResult