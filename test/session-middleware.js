import 'babel-core/register'
import test from 'ava'
import request from 'supertest'
import { spy, stub, match } from 'sinon'

import koa from 'koa'
import session from '../src/server/middleware/session'

const sessionDoc = {
  _id: 'deadbeef',
  session: '{"beep":"boop"}'
}

const bootstrap = function *(next) {
  spy(this.cookies, 'set')
  stub(this.cookies, 'get')
    .withArgs('testA')
      .returns(null)
    .withArgs('testB')
      .returns('f42a10f3a062b4c403bf26fbdec620e0')
  yield next
}

test.beforeEach(t => {
  const Session = {
    findById: stub(),
    findByIdAndUpdate: stub(),
    create: stub()
  }

  for (let stub in Session) {
    Session[stub].returns(Promise.resolve(sessionDoc))
  }

  const mockMongo = function *(next) {
    this.db = { Session }
    yield next
  }

  const app = koa()
  app.keys = ['foo', 'bar']
  app.use(bootstrap)
  app.use(mockMongo)
  t.context.app = app
  t.context.Session = Session
})

test.cb('creates a new session', t => {
  const app = t.context.app
  const Session = t.context.Session

  app.use(session(app, { key: 'testA' }))
  app.use(function *() {
    this.session.test = 1
    this.body = this.session
  })

  request(app.listen())
    .get('/')
    .expect(res => {
      t.ok(Session.create.calledWithMatch({ session: '{"test":1}' }))
      t.same(res.text, '{"test":1}')
      t.same(res.body, { test: 1 })
    })
    .expect(200)
    .end(t.end)
})

test.cb('loads a session from Mongo', t => {
  const app = t.context.app
  const Session = t.context.Session

  app.use(session(app, { key: 'testB' }))
  app.use(function *() {
    this.body = this.session
  })

  request(app.listen())
    .get('/')
    .expect(res => {
      t.notOk(Session.create.called)
      t.ok(Session.findById.calledWith('deadbeef'))
      t.same(res.text, '{"beep":"boop"}')
      t.same(res.body, { beep: 'boop' })
    })
    .expect(200)
    .end(t.end)
})

test.cb('saves session to Mongo', t => {
  const app = t.context.app
  const Session = t.context.Session

  app.use(session(app, { key: 'testB' }))
  app.use(function *() {
    this.session.test = 'testB'
    this.body = this.session
  })

  request(app.listen())
    .get('/')
    .expect(res => {
      t.notOk(Session.create.called)
      t.ok(Session.findByIdAndUpdate.calledWith('deadbeef', match({
        session: '{"beep":"boop","test":"testB"}'
      })))
      t.same(res.text, '{"beep":"boop","test":"testB"}')
      t.same(res.body, { beep: 'boop', test: 'testB' })
    })
    .expect(200)
    .end(t.end)
})
