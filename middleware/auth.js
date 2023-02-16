// module.exports = {
//   authenticator: (req, res, next) => {
//     if (req.isAuthenticated()) {
//       return next()
//     }
//     req.flash('warning_msg', '請先登入才能使用')
//     res.redirect('/log_in')
//   }
// }
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
