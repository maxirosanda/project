import Product from '../../models/products.js'
import {generator} from '../utils/generator.js'
import  fs from 'fs'
import path from 'path'


export const edit = async (req,res)=>{
  const productfound = await Product.find({_id:req.params._id}).lean()

  if (!productfound) {
    return res.status(200).render("nofound",{message:"no se encontro el Producto"})
  }
  res.status(200).render('editproduct',{product:productfound})
}

export const add = async (req, res, next) => {
    try {
          const products = await Product.find({}).lean()

          res.status(200).render("editproducts",{products:products})

    } 
    catch (e) { console.log(e) }
  }

  export const read = async (req, res, next) => {
    try {
          const products = await Product.find({}).lean()

          res.status(200).render("products",{products:products})

    } 
    catch (e) { console.log(e) }
  }

  export const readId = async (req, res, next) => {
    try {
          const productfound = await Product.find({_id:req.params._id}).lean()

          if (!productfound) {
            return res.status(200).render("nofound",{message:"no se encontro el Producto"})
          }

          await res.status(200).json(productfound)  
    } 
    catch (e) { console.log(e) }
  }

  export const create = async (req, res, next) => {
    try {
           req.body.url = req.body.nombre + generator(10) + ".png"

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