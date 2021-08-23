import mongoose from 'mongoose'
import  config from './config.js'

export const conectarDB = async () => {
  try {

    await mongoose.connect(config.BASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log(`database connected`)
  } catch (e) {
    console.log(`error ${e}`)
    process.exit(1)
  }
}
