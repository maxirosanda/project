import mongoose from 'mongoose'

const ordersCollection = 'orders'

const ordersSchema = new mongoose.Schema({

  _idUser: { type: String, require: true },
  name:{type:String,require: true},
  email: { type: String, require: true },
  address:{type:String,require: true},
  items: { type: Array, require: true },
  state: { type: String, default:"Pendiente"},
  date: { type: Date, default: Date.now }

})

export default mongoose.model(ordersCollection, ordersSchema)