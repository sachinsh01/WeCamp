const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
    res.render("users/register");
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err)
                next(err);

            req.flash("success", "Welcome to WeCamp");
            res.redirect("/campgrounds");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("users/login");
}

module.exports.login = (req, res) => {
    const redirectURL = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    req.flash("success", "Welcome Back!");
    res.redirect(redirectURL);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "You are successfully logged out!");
    res.redirect("/");
}