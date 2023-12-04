const isLogin = (req, res, next) => {
    if (req.session.user_id) { }
    else {
        return res.redirect("/")
    }
    next();
};

const isLogout = (req, res, next) => {
    if (req.session.user_id) {
        return res.redirect("/home");
    }
    next()
}


module.exports = {
    isLogin,
    isLogout
}
