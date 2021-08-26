import * as controllerProducts from '../controllers/controllerProducts.js'
import * as middlewareClient from '../middlewares/middlewareClient.js'
import * as middlewareAdmin from '../middlewares/middlewareAdmin.js'

const routesProducts = app => {


    //Products
    app.get('/product/edit/:_id',middlewareAdmin.auth,controllerProducts.edit)
    app.get('/products/edit',middlewareAdmin.auth,controllerProducts.add)
    app.get('/products',middlewareClient.auth,controllerProducts.read)
    app.get('/product/:_id',middlewareClient.auth,controllerProducts.readId)
    app.post('/products',middlewareClient.auth,controllerProducts.create)
    app.put('/products',middlewareClient.auth,controllerProducts.update)
    app.delete('/products',middlewareClient.auth,controllerProducts.del)
}
export default routesProducts