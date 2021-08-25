
import mongoose from 'mongoose'
import User from '../models/users.js'
import passport from 'passport'
import Local from 'passport-local'
import bcrypt from 'bcrypt'
import  config from '../config/config.js'
import enviarmail from '../src/utils/email.js'

mongoose.set('useCreateIndex', true)
const LocalStrategy = Local.Strategy

const isValidPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password)
}
const createHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

export const ConectarPassport = () => {
  passport.use('login', new LocalStrategy({ passReqToCallback: true },
    function (req, username, password, done) {
      User.findOne({ username: username },
        function (err, user) {
          if (err) return done(err)
          if (!user) return done(null, false)
          if (!isValidPassword(user, password)) return done(null, false)
          return done(null, user)
        })
    })
  )

  passport.use('register', new LocalStrategy({ passReqToCallback: true },
    function (req, username, password, done) {
      const findOrCreateUser = function () {
        User.findOne({ username: username },
          function (err, user) {
            if (err) return done(err)
            if (user) {
              return done(null, false)
            } else {
              const newUser = new User()
              newUser.username = username
              newUser.password = createHash(password)
              newUser.email = req.body.email,
              newUser.tel = req.body.tel,
              newUser.address = req.body.address,
              newUser.name=req.body.name 

              enviarmail({
                from:config.MAIL,
                to: newUser.email,
                subject: `Usted se registro en nuestra app`,
                html: `Usted se registro en nuestra app`,
            })
            enviarmail({
              from:config.MAIL,
              to: config.MAIL,
              subject: `Nuevo usuario registrado con el nombre de usuario ${newUser.name}`,
              html: `Nuevo usuario registrado con el nombre de usuario ${newUser.name}`,
          })

              newUser.save(function (err) {
                if (err) { throw err }
                return done(null, newUser)
              })
            }
          })
      }
 
      process.nextTick(findOrCreateUser)
    })
  )

  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      if (err) {
        console.log(err.stack)
      }
      done(null, user)
    })
  })
}
