import 'babel-register'
import test from 'ava'
import { encrypt, decrypt } from '../src/server/lib/crypto'

const keys = ['foo', 'bar']

test('encrypts plain text', t => {
  const encrypted = encrypt('foo bar', keys)
  t.same(encrypted, '5f70ce8f733489d4d0f4b1ce3b4dd52e')
})

test('decrypts encrypted text', t => {
  const encrypted = '5f70ce8f733489d4d0f4b1ce3b4dd52e'
  t.same(decrypt(encrypted, keys), 'foo bar')
})
