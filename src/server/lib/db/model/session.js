import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const sessionSchema = new Schema({
  session: { type: String },
  expires: { type: Date, expires: 259200 }
})

const Session = mongoose.model('Session', sessionSchema)

export default Session
