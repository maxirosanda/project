
import User from '../../models/users.js'

export const viewlogin = (req, res) => {
  res.status(200).render('login')
}
export const viewregister = (req, res) => {
  res.status(200).render('register')
}

export const login = (req, res) => {
  res.status(200).redirect('/products')
}

export const register = (req, res) => {
  res.status(200).redirect('/products')
}

export const logout = async (req, res) => {
  try {
    const user = await User.find({ username: req.user.username }).lean()
    await req.session.destroy(err => {
      if (err) return err
      res.status(200).redirect('/login')
    })
  } catch (e) { loggerError.error(e) }
}
