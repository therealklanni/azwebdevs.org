import bug from 'debug'

export default (name) => {
  const debug = bug(name)
  debug.useColors = process && !!process.env.FORCE_COLOR

  return debug
}
