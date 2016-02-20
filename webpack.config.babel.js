import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import path from 'path'

let jsLoaders = ['babel?presets[]=react,presets[]=2015']

if (process.env.NODE_ENV !== 'production') {
  jsLoaders.unshift('react-hot')
}

const config = {
  entry: getEntrySources([path.resolve('client/index')]),
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
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

export default config
