import Product from '../../models/products.js'
import Cart from '../../models/carts.js'
import {generator} from '../utils/generator.js'
import  fs from 'fs'
import path from 'path'


export const edit = async (req,res)=>{
  const productfound = await Product.find({_id:req.params._id}).lean()

  if (!productfound) {
    return res.status(200).render("nofound",{message:"no se encontro el Producto"})
  }

  res.status(200).render('editproduct',{product:productfound,_id:req.user._id})
}

export const add = async (req, res, next) => {
    try {
          const products = await Product.find({}).lean()

          res.status(200).render("editproducts",{products:products,_id:req.user._id})

    } 
    catch (e) { console.log(e) }
  }

  export const read = async (req, res, next) => {
    try {
          let products = await Product.find({}).lean()
          const cartfound = await Cart.find({_idUser:req.user._id}).lean()
                    //----------------------------------
        let product= {}
        let productsincart=[]
        let productsfilter
        let i = 0;
      while(i<=cartfound[0].items.length-1){
        product =  await Product.find({_id:cartfound[0].items[i]._id}).lean()
        product[0].stock= product[0].stock-cartfound[0].items[i].quantity
        productsfilter=products.filter(el => el._id !== product[0]._id )
        productsincart.push(product[0])
      i++
      }
      
      
      //-----------------------------------------------------
          res.status(200).render("products",{products:productsfilter,_id:req.user._id})

    } 
    catch (e) { console.log(e) }
  }

  export const readId = async (req, res, next) => {
    try {
          const productfound = await Product.find({_id:req.params._id}).lean()

          if (!productfound) {
            return res.status(200).render("nofound",{message:"no se encontro el Producto"})
          }
        

          res.status(200).render("product",{product:products,_id:req.user._id}) 
    } 
    catch (e) { console.log(e) }
  }

  export const create = async (req, res, next) => {
    try {
           req.body.url = req.body.name + generator(10) + ".png"

            const product= new Product(req.body)
            await product.save()
            const EDFile = req.files.url

            EDFile.mv(`./public/img/products/${req.body.url}`,err => {
              if(err) return res.status(500).send({ message : err })
              return res.status(200).render("nofound",{message:"no se encontro el Producto"})
              })
            await res.status(200).redirect("/products/edit")  
        } 
    catch (e) { console.log(e) }
  }

  export const update = async (req, res, next) => {

    const {_id, name, description,price, url, stock ,category} = req.body
    let EDFile
    if(req.files) EDFile = req.files.newurl

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
            return res.status(200).render("nofound",{message:"no se encontro el Producto"})
          }

      await Product.findOneAndUpdate(
        { _id: _id },
        { $set: newproduct },
        { new: true }
      )

      if(EDFile) {
        EDFile.mv(`./public/img/products/${url}`,err => {if(err) return res.status(500).send({ message : err })})
      } 
      return res.status(200).redirect("/products/edit") 
      
    } 
    catch (e) { console.log(e) }
  }


  export const del = async (req, res, next) => {
    
    try {
      const productfound = await Product.find({_id:req.body._id}).lean()
      if ((Object.entries(productfound).length === 0)) {
        return res.status(200).render("nofound",{message:"no se encontro el Producto"})
      }
      await Product.deleteOne({ _id: req.body._id })
      fs.unlinkSync(path.join("public/img/products/", req.body.url))
      res.status(200).redirect("/products/edit")  
    } catch (e) { console.log(e) }
  }