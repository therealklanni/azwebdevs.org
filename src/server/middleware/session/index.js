import logger from '../../../common/lib/logger'
const debug = logger('SIR:session')

import crypto from '../../lib/crypto'
import Session from '../../lib/db/session'

const cookieOptions = {
  signed: true,
  overwrite: true
}

export default (app, options = {
  key: 'koa:sess'
}) => {
  let _session
  let sessionDoc
  let sessionId

  return function *(next) {
    this.__defineGetter__('session', () => {
      const session = { ..._session }
      if (session) return session

      // unset
      if (session === false) return null

      return session
    })

    this.__defineSetter__('session', value => {
      if (value == null) return _session = false
      if (typeof value === 'object') return _session = value
      throw new Error('this.session can only be set as null or an object.')
    })

    let sessionCookie = this.cookies.get(options.key, cookieOptions)

    if (sessionCookie) {
      debug('Found session cookie', sessionCookie)
      try {
        sessionId = crypto.decrypt(sessionCookie, app.keys)
        debug('Decrypted Session ID', sessionId)
      } catch (e) {
        debug('Unable to decrypt Session ID', e.stack)
        this.cookies.set(options.key, cookieOptions)
        sessionCookie = null
      }
    } else {
      debug('No session cookie')
    }

    if (sessionId) {
      sessionDoc = yield Session.findById(sessionId, '-expires')
      if (sessionDoc) {
        debug('Found session', sessionDoc)
      } else {
        debug('Session not found / expired')
        this.cookies.set(options.key, cookieOptions)
        sessionCookie = null
      }
    }

    _session = sessionDoc ? JSON.parse(sessionDoc.session) : {}

    yield *next

    _session = this.session
    const sessionData = JSON.stringify(_session)

    if (sessionDoc) {
      this.cookies.set(options.key, crypto.encrypt(`${sessionId}`, app.keys), cookieOptions)
      sessionDoc = yield Session.findByIdAndUpdate(sessionId, { session: sessionData || '{}', expires: Date.now() })
      debug('Updated Session', sessionDoc)
    } else {
      sessionDoc = yield Session.create({ session: sessionData || '{}', expires: Date.now() })
      sessionId = sessionDoc._id
      _session = JSON.parse(sessionDoc.session)
      this.cookies.set(options.key, crypto.encrypt(`${sessionId}`, app.keys), cookieOptions)
      debug('Created new session', sessionDoc)
    }
  }
}
