import Cart from '../../models/carts.js'
import Product from '../../models/products.js'

export const read = async (req, res, next) => {
    try {
      
      const cartfound = await Cart.find({_idUser:req.user._id}).lean()
      

      if ((Object.entries(cartfound).length === 0)) {
        return res.status(200).json({mensaje:"no se encontro el carrito"})
       }

      let product= {}
      const products = []


      let i = 0;
      while(i<=cartfound[0].items.length-1){
        product =  await Product.find({_id:cartfound[0].items[i]._id})
        products.push(product)
      i++
      }

      await res.status(200).json(products)  
    } 
    catch (e) { console.log(e) }
  }

  export const create = async (req, res, next) => {
    try {
      
      const cartfound = await Cart.find({_idUser:req.user._id}).lean()
      
      //si no existe el carrito
      if ((Object.entries(cartfound).length === 0)) {
      const newCart = {
        _idUser:req.user._id,
        items:{_id:req.body._id,quantity:req.body.quantity}
    
        }
        const cart = new Cart(newCart)
        await cart.save()
        return await res.status(200).json(cart)
      }

      //si el carrito existe y el producto tambien
      let i = 0;
      while(i<=cartfound[0].items.length-1){
      if(cartfound[0].items[i]._id==req.body._id){
        cartfound[0].items[i].quantity= cartfound[0].items[i].quantity +req.body.quantity      
        await Cart.findOneAndUpdate(
          { _id: cartfound[0]._id },
          { $set: cartfound[0] },
          { new: true }
        )
       return await  res.status(200).json(cartfound[0])
      }
      i++
      }
      
      //si el carrito existe pero no el producto

      cartfound[0].items.push({_id:req.body._id,quantity:req.body.quantity})
      await Cart.findOneAndUpdate(
        { _id: cartfound[0]._id },
        { $set: cartfound[0] },
        { new: true }
      )
      return res.status(200).json(cartfound[0])
             
        } 
    catch (e) { console.log(e) }
  }

  export const update = async (req, res, next) => {

    try {

      const cartfound = await Cart.find({_idUser:req.user._id}).lean()

      if ((Object.entries(cartfound).length === 0)) {
       return res.status(200).json({mensaje:"no se encontro el producto"})
      }
      let i = 0;
      while(i<=cartfound[0].items.length-1){
      if(cartfound[0].items[i]._id==req.body._id){
        cartfound[0].items[i].quantity= cartfound[0].items[i].quantity +req.body.quantity      
        await Cart.findOneAndUpdate(
          { _id: cartfound[0]._id },
          { $set: cartfound[0] },
          { new: true }
        )
        return res.status(200).json(cartfound[0])
      }
      i++
      }    

      return res.status(200).json({mensaje:"no se encontro el producto"}) 
    } 
    catch (e) { console.log(e) }
  }

  export const delprod = async (req, res, next) => {
    
    try {
      const cartfound = await Cart.find({_idUser:req.user._id}).lean()
      
      if ((Object.entries(cartfound).length === 0)) {
        return res.status(200).json({mensaje:"no se encontro el carro"})
       }

      let i = 0;
      while(i<=cartfound[0].items.length-1){
      if(cartfound[0].items[i]._id==req.body._id){
        cartfound[0].items.splice(i, 1);
        await Cart.findOneAndUpdate(
          { _id: cartfound[0]._id },
          { $set: cartfound[0] },
          { new: true }
        )
       return res.status(200).json(cartfound[0])
      }
      i++
      } 

      return res.status(200).json({mensaje:"no se encontro el producto"}) 

    } catch (e) { console.log(e) }
  }

  export const del = async (req, res, next) => {
    try {
      const cart = await Cart.deleteOne({ _id:req.params.id })
      await res.json({"mesaje":"se elimino el producto","_id":req.params.id})
    } catch (e) { loggerError.error(e) }
  }