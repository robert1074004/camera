const { ensureAuthenticated, getUser } = require('../helpers/auth-helper')
const authenticated = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/log_in')
}
const authenticatedAdmin = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    if (getUser(req).isAdmin) return next()
    res.redirect('/')
  } else {
    res.redirect('/log_in')
  }
}
module.exports = {
  authenticated,
  authenticatedAdmin
}
