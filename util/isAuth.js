module.exports = (req, res, next) => {
    if (req.session.isLoggedIn!=true) {
        console.log('Attempt  to access a forbidden page');
        return res.redirect('/login');
    }
    next();
}