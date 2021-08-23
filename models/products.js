import mongoose from 'mongoose'

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({

  name: { type: String, require: true },
  description: { type: String, require: true },
  url: { type: String, require: true },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
  category:{ type: String, require: true }

})

export default mongoose.model(productsCollection, productsSchema)