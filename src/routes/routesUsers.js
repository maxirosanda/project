import * as controllerSession from '../controllers/controllerSession.js'
import passport from 'passport'
import * as middlewareUser from '../middlewares/middlewareUser.js'
 const routesUsers = app => {

    app.get('/login',middlewareUser.auth,controllerSession.viewlogin)
    app.get('/register',middlewareUser.auth,controllerSession.viewregister)

    app.get('/logout', controllerSession.logout)
    app.get('/failLogin', (req, res) => { res.send('falla al logear') })
    app.get('/failRegister', (req, res) => { res.send('falla al registrar') })
    app.post('/login', passport.authenticate('login', { failureRedirect: 'failLogin' }), controllerSession.login)
    app.post('/register', passport.authenticate('register', { failureRedirect: 'failRegister' }),controllerSession.register)

}

export default routesUsers
