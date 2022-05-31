module.exports = {
    authenticator: (req,res,next) => {
        console.log(req.isAuthenticated())
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/users/log_in')
    }
}