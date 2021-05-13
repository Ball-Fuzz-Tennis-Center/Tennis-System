"use strict";

const Subscriber = require("../models/subscriber");

module.exports = {
    showIndex: (req, res) => {
        res.render("index");
    },
    showCalendar: (req, res) => {
        res.render("calendar");
    },
    showShop: (req, res) => {
        res.render("shop");
    },
    
    create: (req, res, next) => {
        if (req.skip) return next();
        Subscriber.findOne({ email: req.body.email }, function (err, user) {
            if (user) {
                req.flash("error", "You have already been signed up.");
                res.locals.redirect = "/";
                next();
            }
            else {
                req.flash("sucess", " Thank you for signing up");
                res.locals.redirect = "/";
            }
        })
    }

};
