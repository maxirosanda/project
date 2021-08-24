import mongoose from 'mongoose'

const usersCollection = 'users'

const usersSchema = new mongoose.Schema({

  username: { type: String, require: true },
  email: { type: String, require: true },
  name:{type:String,require:true},
  password: { type: String, require: true },
  tel: { type: String, require: true },
  address:{type:String,require: true},
  type:{type:String,default:"client"}

})

export default mongoose.model(usersCollection, usersSchema)