module.exports = {
    authenticator: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/users/log_in')
    }
  }