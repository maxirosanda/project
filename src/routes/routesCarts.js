import * as controllerCarts from '../controllers/controllerCarts.js'
import * as middlewareClient from '../middlewares/middlewareClient.js'


 const routesCarts = app => {

    //Carts
    app.get('/cart/:_id',middlewareClient.auth,controllerCarts.read)
    app.post('/cart',middlewareClient.auth,controllerCarts.create)
    app.put('/cart',middlewareClient.auth,controllerCarts.update)
    app.delete('/cart',middlewareClient.auth,controllerCarts.del)
}
export default routesCarts
