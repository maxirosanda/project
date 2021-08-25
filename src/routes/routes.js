import passport from 'passport'
import * as controllerProducts from '../controllers/controllerProducts.js'
import * as controllerCarts from '../controllers/controllerCarts.js'
import * as controllerSession from '../controllers/controllerSession.js'
import * as controllerOrders from '../controllers/controllerOrders.js'
import * as middlewareClient from '../middlewares/middlewareClient.js'
import * as middlewareAdmin from '../middlewares/middlewareAdmin.js'

export const routes = app => {

    app.get('/login',controllerSession.viewlogin)
    app.get('/register',controllerSession.viewregister)

    app.get('/logout', controllerSession.logout)
    app.get('/failLogin', (req, res) => { res.send('falla al logear') })
    app.get('/failRegister', (req, res) => { res.send('falla al registrar') })
    app.post('/login', passport.authenticate('login', { failureRedirect: 'failLogin' }), controllerSession.login)
    app.post('/register', passport.authenticate('register', { failureRedirect: 'failRegister' }),controllerSession.register)

    //Products
    app.get('/product/edit/:_id',middlewareAdmin.auth,controllerProducts.edit)
    app.get('/products/edit',middlewareAdmin.auth,controllerProducts.add)
    app.get('/products',middlewareClient.auth,controllerProducts.read)
    app.get('/product/:_id',middlewareClient.auth,controllerProducts.readId)
    app.post('/products',middlewareClient.auth,controllerProducts.create)
    app.put('/products',middlewareClient.auth,controllerProducts.update)
    app.delete('/products',middlewareClient.auth,controllerProducts.del)

    //Carts
    app.get('/cart/:_id',middlewareClient.auth,controllerCarts.read)
    app.post('/cart',middlewareClient.auth,controllerCarts.create)
    app.put('/cart',middlewareClient.auth,controllerCarts.update)
    app.delete('/cart',middlewareClient.auth,controllerCarts.del)

    //Orders
    app.get('/orders',middlewareClient.auth,controllerOrders.read)
    app.get('/order',middlewareClient.auth,controllerOrders.create)


}

