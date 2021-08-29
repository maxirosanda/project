import * as controllerSession from '../controllers/controllerSession.js'
import passport from 'passport'

 const routesUsers = app => {

    app.get('/login',controllerSession.viewlogin)
    app.get('/',controllerSession.viewlogin)
    app.get('/register',controllerSession.viewregister)

    app.get('/logout', controllerSession.logout)
    app.get('/failLogin', (req, res) => { res.send('falla al logear') })
    app.get('/failRegister', (req, res) => { res.send('falla al registrar') })
    app.post('/login', passport.authenticate('login', { failureRedirect: 'failLogin' }), controllerSession.login)
    app.post('/register', passport.authenticate('register', { failureRedirect: 'failRegister' }),controllerSession.register)

}

export default routesUsers
