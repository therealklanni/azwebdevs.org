import us from 'microseconds'

class Perf {
  start () {
    return us.now()
  }

  stop (microtime) {
    return us.parse(us.since(microtime)).toString()
      .replace(' minutes', 'm')
      .replace(' seconds', 's')
      .replace(' milliseconds', 'ms')
      .replace(' microseconds', 'μs')
      .replace(/^(.*)$/, '($1)')
  }

  since (microtime) {
    return us.since(microtime)
  }
}

export default new Perf()
