
import User from '../../models/users.js'


export const login = (req, res) => {
  res.json(req.user)
}

export const register = (req, res) => {
  res.json(req.user)
}

export const logout = async (req, res) => {
  try {
    const user = await User.find({ username: req.user.username }).lean()
    await req.session.destroy(err => {
      if (err) return err
      res.json(user)
    })
  } catch (e) { loggerError.error(e) }
}
