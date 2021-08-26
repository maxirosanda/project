import * as controllerOrders from '../controllers/controllerOrders.js'
import * as middlewareClient from '../middlewares/middlewareClient.js'

 const routesOrders = app => {

    //Orders
    app.get('/orders',middlewareClient.auth,controllerOrders.read)
    app.get('/order',middlewareClient.auth,controllerOrders.create)


}

export default routesOrders

