const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const users = require("../controllers/users");
const catchAsync = require("../utilities/catchAsync");


router.route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route("/login")
    .get(users.renderLogin)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login);

/* router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err)
            return next(err);

        req.flash("success", "You are successfully logged out!");
        res.redirect("/campgrounds");
    });
}) */

router.post("/logout", users.logout);

module.exports = router;