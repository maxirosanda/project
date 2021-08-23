import mongoose from 'mongoose'

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({

  _idUser: {type:String,require:true},
  date: { type: Date, default: Date.now },
  items: { type: Array, require: true }

})

export default mongoose.model(cartsCollection, cartsSchema)