export const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
      
        next()
      }
 else {
      res.send('error usuario no autorizado')
    }
  }
  