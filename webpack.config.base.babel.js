import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import path from 'path'
import deepextend from 'deep-extend'

const clientJs = path.resolve('client/index.js')
const serverJs = path.resolve('src/server.js')

let jsLoaders = 'babel-loader'

if (process.env.NODE_ENV !== 'production') {
  jsLoaders = ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015']
}

const config = {
  entry: {
    client: getEntrySources([clientJs]),
    server: serverJs
  },
  devtool: 'eval',
  output: {
    path: path.resolve('build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader',
          'sass-loader?sourceMap'
        )
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: jsLoaders
      }
    ]
  },
  // sassLoader: {
  //   includePaths: [path.resolve('client/scss')]
  // },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
  plugins: [
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
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources
}

export default config
