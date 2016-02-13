import perf from '../../lib/perf'

export default () => function *responseTime (next) {
  var start = perf.start()
  yield next
  this.set('X-Response-Time', perf.since(start))
}
