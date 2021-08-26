import mongoose from 'mongoose'

const messajesCollection = 'messajes'

const messajesSchema = new mongoose.Schema({

  email: { type: String, require: true },
  type: { type: String, require: true },
  date: { type: Date, default: Date.now },
  body: { type: String, require: true },
    id:  { type: String, require: true }
})

export default mongoose.model(messajesCollection, messajesSchema)