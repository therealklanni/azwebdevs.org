import 'babel-polyfill'
import logger from './common/lib/logger'
const debug = logger('SIR:server')

import perf from './server/lib/perf'
const serverStart = perf.start()

import koa from 'koa'
const app = koa()

app.keys = [process.env.SECRET_TOKEN || 'ohai^^']

import compose from 'koa-compose'

// middleware
import responseTimer from './server/middleware/response-timer'
import requestLogger from './server/middleware/request-logger'
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'

app.use(compose([
  responseTimer(),
  requestLogger(),
  session(app, {
    signed: true,
    secure: true,
    maxAge: 259200000 // 72 hours
  }),
  bodyParser()
]))

app.use(function *(next) {
  this.body = 'Hello world'
  yield next
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  debug(`Server running at http://localhost:${port}`, perf.stop(serverStart))
})
