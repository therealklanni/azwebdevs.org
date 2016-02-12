import logger from '../../../common/lib/logger'
const debug = logger('SIR:mongo')

import mongoose from 'mongoose'
import User from '../../lib/db/model/user'

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_DB || 'mongodb://localhost/azwebdevs-org')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))

db.once('open', () => {
  debug('MongoDB connected')
})

export default () => function *mongodb(next) {
  this.db = db
  this.db.User = User

  yield next
}
