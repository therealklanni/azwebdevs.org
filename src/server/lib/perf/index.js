import μs from 'microseconds'

class Perf {
  start() {
    return μs.now()
  }

  stop(microtime) {
    return μs.parse(μs.since(microtime)).toString()
      .replace(/ minutes?/, 'm')
      .replace(/ seconds?/, 's')
      .replace(/ milliseconds?/, 'ms')
      .replace(/ microseconds?/, 'μs')
      .replace(/^(.*)$/, '($1)')
  }

  since(microtime) {
    return μs.since(microtime)
  }
}

export default new Perf()
