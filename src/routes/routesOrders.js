import * as controllerOrders from '../controllers/controllerOrders.js'
import * as middlewareClient from '../middlewares/middlewareClient.js'
import * as middlewareAdmin from '../middlewares/middlewareAdmin.js'

 const routesOrders = app => {

    //Orders
    app.get('/orders',middlewareClient.auth,controllerOrders.read)
    app.get('/order',middlewareClient.auth,controllerOrders.create)
    app.get('/ordersadmin',middlewareAdmin.auth,controllerOrders.readAdmin)
    app.put('/changestate',middlewareAdmin.auth,controllerOrders.changeState)

    

}

export default routesOrders

