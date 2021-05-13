"use strict";

const Subscriber = require("../models/subscriber");
const Item = require("../models/item");

module.exports = {
    showIndex: (req, res) => {
        res.render("index");
    },
    showCalendar: (req, res) => {
        res.render("calendar");
    },
    
    createSubscribers: (req, res, next) => {
        let newSubcriber = {
            email: req.body.email,
            phone: req.body.phone,
            date: req.body.date,
           
        };
        Subscriber.create(newSubcriber)
        .then( subscriber => {
            res.locals.redirect = "/signin";
            res.locals.subscriber = subscriber;
            
            next();
        })
        .catch( error => {
            console.log(`Error saving course: ${error.message}`);
             next(error)
        })
    },
    redirectView: (req,res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath !== undefined )res.redirect(redirectPath);
        else next();
    }
};
