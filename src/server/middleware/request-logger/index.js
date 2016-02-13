import logger from '../../../common/lib/logger'
const debug = logger('SIR:request')
const debugBody = logger('SIR:request:body')

import chalk from 'chalk'
import perf from '../../lib/perf'

export default () => function * requestLogger (next) {
  var start = perf.start()
  yield next

  let statusColor = 'white'

  switch (this.response.status.toString().replace(/\d\d$/, 'xx')) {
    case '2xx':
      statusColor = 'green'
      break

    case '3xx':
      statusColor = 'cyan'
      break

    case '4xx':
      statusColor = 'yellow'
      break

    case '5xx':
      statusColor = 'red'
      break
  }

  debug(
    `${this.method} ${chalk.white(this.url)}`,
    chalk.bold[statusColor](this.response.status),
    perf.stop(start)
  )

  if (Object.keys(this.request.body).length) {
    debugBody(JSON.stringify(this.request.body, null, 4))
  }
}
