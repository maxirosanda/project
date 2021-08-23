import Product from '../../models/products.js'

export const read = async (req, res, next) => {
    try {
          const products = await Product.find({}).lean()

          if ((Object.entries(products).length === 0)) {
            return res.status(200).json({mensaje:"no se encontro ningun Producto"})
          }

          await res.status(200).json(products)  
    } 
    catch (e) { console.log(e) }
  }
  export const readId = async (req, res, next) => {
    try {
          const productfound = await Product.find({_id:req.params._id}).lean()

          if (!productfound) {
            return res.status(200).json({mensaje:"no se encontro el Producto"})
          }

          await res.status(200).json(productfound)  
    } 
    catch (e) { console.log(e) }
  }

  export const create = async (req, res, next) => {
    try {
            const product= new Product(req.body)
            await product.save()
            await res.status(200).json(product)  
        } 
    catch (e) { console.log(e) }
  }

  export const update = async (req, res, next) => {

    const {_id, name, description,price, url, stock ,category} = req.body

    const newproduct = {}
    if (name) newproduct.name = name
    if (description) newproduct.description = description
    if (price) newproduct.price = price
    if (stock) newproduct.stock = stock
    if (url) newproduct.url = url
    if (category) newproduct.category = category

    try {
      const productfound = await Product.find({_id:_id}).lean()
          if ((Object.entries(productfound).length === 0)) {
            return res.status(200).json({mensaje:"no se encontro el Producto"})
          }

      await Product.findOneAndUpdate(
        { _id: _id },
        { $set: newproduct },
        { new: true }
      )
       await res.status(200).json(newproduct)
    } 
    catch (e) { console.log(e) }
  }

  export const del = async (req, res, next) => {
    
    try {
      const productfound = await Product.find({_id:req.body._id}).lean()
      if ((Object.entries(productfound).length === 0)) {
        return res.status(200).json({mensaje:"no se encontro el Producto"})
      }
      const product = await Product.deleteOne({ _id: req.body._id })
      await res.status(200).json({_id:req.body._id})
    } catch (e) { console.log(e) }
  }