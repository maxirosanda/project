import Order from '../../models/orders.js'
import Cart from '../../models/carts.js'
import Product from '../../models/products.js'
import enviarmail from '../utils/email.js'
import config from '../../config/config.js'

export const read = async (req, res, next) => {
  try {
    const orders = await Order.find({_idUser:req.user._id}).lean()
        await res.status(200).json(orders)  
  } 
  catch (e) { console.log(e) }
}


export const create = async (req, res, next) => {
    try {

      const cartfound = await Cart.find({_idUser:req.user._id}).lean()

      if ((Object.entries(cartfound).length === 0)) {
        return res.status(200).json({mensaje:"no se encontro el producto"})
       }

      let product= ""
      let products = []


      let i = 0;
      while(i<=cartfound[0].items.length-1){
        product = await Product.find({_id:cartfound[0].items[i]._id})
        products.push(product)
      i++
      }
      console.log(products)
            const neworder = {
              _idUser: req.user._id,
              name: req.user.name,
              email: req.user.email,
              address: req.user.address,
              items: products

            }
            const order= new Order(neworder)
            await order.save()
            await Cart.deleteOne({ _idUser:req.user._id})

            enviarmail({
              from:config.MAIL,
              to: req.user.mail,
              subject: `Su compra esta en proceso`,
              html: `Su compra esta en proceso`,
          })
          enviarmail({
            from:config.MAIL,
            to: config.MAIL,
            subject: `Orden del usuario ${req.user.name}`,
            html: `Un nuevo usuario con nombre: ${req.user.name} realizo una orden`,
        })

            await res.status(200).json(order)  
        } 
    catch (e) { console.log(e) }
  }