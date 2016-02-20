import { createCipheriv, createDecipheriv } from 'crypto'

const algorithm = 'aes256'
const pad = (str, size) => `${str}00000000000000000000000000000000`.slice(0, size)

export const encrypt = function (secret, keys) {
  const key = new Buffer(pad(keys[0], 32))
  const iv = new Buffer(pad(keys[1], 16))
  const cipher = createCipheriv(algorithm, key, iv)
  return cipher.update(secret, 'utf8', 'hex') + cipher.final('hex')
}

export const decrypt = function (encrypted, keys) {
  const key = new Buffer(pad(keys[0], 32))
  const iv = new Buffer(pad(keys[1], 16))
  const decipher = createDecipheriv(algorithm, key, iv)
  return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8')
}

export default { encrypt, decrypt }
