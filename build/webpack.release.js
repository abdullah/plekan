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



/*
*@TODO: Versiyonlama için burasını kullanabiliriz...
*/

var argv = require('minimist')(process.argv.slice(2));



var version = require('../package.json').version;

baseWebpackConfig.entry = {
  'plekanbuilder': argv.custom ? './src/_plekan.js' :'./src/plekan.js',
}

var assetsPath = path.join(config.release.assetsRoot, config.release.assetsSubDirectory)

rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)


var mergeResult = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path:'customrelease',
    filename: '[name].js',
    library: 'plekan',
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