var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var path = require('path')

var jsLoaders = ['babel']

if (process.env.NODE_ENV !== 'production') {
  jsLoaders.unshift('react-hot')
}

module.exports = {
  entry: getEntrySources([path.resolve('src/client/index')]),
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?sourceMap!postcss!sass?sourceMap'
        )
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: jsLoaders
      }
    ]
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['', '.js']
  }
}

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:3001')
    sources.push('webpack/hot/only-dev-server')
  }

  return sources
}
