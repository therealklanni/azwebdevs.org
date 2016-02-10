import bug from 'debug'
const debug = bug('SIR:server')

import perf from './lib/perf'
const serverStart = perf.start()

import koa from 'koa'
const app = koa()

app.use(function *(next) {
  var start = perf.start()
  yield next
  this.set('X-Response-Time', perf.since(start))
})

app.use(function *(next) {
  var start = perf.start()
  yield next
  debug(this.method, this.url, perf.stop(start))
})

app.use(function *(next) {
  this.body = 'Hello world'
  yield next
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  debug(`Server running at http://localhost:${port} ${perf.stop(serverStart)}`)
})
