import 'babel-polyfill'
import path from 'path'
import { v4 as uuid } from 'uuid'
import koa from 'koa'
const app = koa()

import logger from '../common/lib/logger'
const debug = logger('SIR:server')

import perf from './lib/perf'
const serverStart = perf.start()

app.keys = [process.env.SECRET_TOKEN1 || uuid(), process.env.SECRET_TOKEN2 || uuid()]

import compose from 'koa-compose'

// middleware
import responseTimer from './middleware/response-timer'
import requestLogger from './middleware/request-logger'
import session from './middleware/session'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import mongo from './middleware/mongo'

app.use(compose([
  responseTimer(),
  requestLogger(),
  mongo(),
  session(app, {
    key: 'sir.sid',
    maxAge: 259200000 // 72 hours
  }),
  bodyParser(),
  serve(path.resolve('./public'), { defer: true })
]))

// routes
import routes from './routes'

app.use(routes)

app.use(function *(next) {
  this.body = 'Hello world'
  yield next
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  debug(`Server running at http://localhost:${port}`, perf.stop(serverStart))
})

// Webpack Dev Server for hot reloading
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.config.babel.js'

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  proxy: {
    '*': 'http://localhost:3000'
  }
}).listen(3001, 'localhost', (err, result) => {
  if (err) {
    debug(err)
  }

  debug(`${result}: Listening at http://localhost:30001`)
})
