import logger from './common/lib/logger'
const debug = logger('SIR:server')

import perf from './server/lib/perf'
const serverStart = perf.start()

import koa from 'koa'
const app = koa()

import responseTimer from './server/middleware/response-timer'
app.use(responseTimer)

import requestLogger from './server/middleware/request-logger'
app.use(requestLogger)

app.use(function *(next) {
  this.body = 'Hello world'
  yield next
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  debug(`Server running at http://localhost:${port}`, perf.stop(serverStart))
})
