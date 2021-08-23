import passport from 'passport'
import * as controllerProducts from '../controllers/controllerProducts.js'
import * as controllerCarts from '../controllers/controllerCarts.js'
import * as controllerSession from '../controllers/controllerSession.js'
import * as controllerOrders from '../controllers/controllerOrders.js'
import * as middlewareClient from '../middlewares/middlewareClient.js'


export const routes = app => {
    app.get('/logout', controllerSession.logout)
    app.get('/failLogin', (req, res) => { res.send('falla al logear') })
    app.get('/failRegister', (req, res) => { res.send('falla al registrar') })
    app.post('/login', passport.authenticate('login', { failureRedirect: 'failLogin' }), controllerSession.login)
    app.post('/register', passport.authenticate('register', { failureRedirect: 'failRegister' }),controllerSession.register)

    //Products
    app.get('/',middlewareClient.auth,controllerProducts.read)
    app.get('/:_id',middlewareClient.auth,controllerProducts.readId)
    app.post('/',middlewareClient.auth,controllerProducts.create)
    app.put('/',middlewareClient.auth,controllerProducts.update)
    app.delete('/',middlewareClient.auth,controllerProducts.del)

    //Carts
    app.get('/cart',middlewareClient.auth,controllerCarts.read)
    app.post('/cart',middlewareClient.auth,controllerCarts.create)
    app.put('/cart',middlewareClient.auth,controllerCarts.update)
    app.delete('/cart',middlewareClient.auth,controllerCarts.delprod)
    app.delete('/cart/:_id',middlewareClient.auth,controllerCarts.del)

    //Orders
    app.get('/order',middlewareClient.auth,controllerOrders.read)
    app.post('/order',middlewareClient.auth,controllerOrders.create)


}

