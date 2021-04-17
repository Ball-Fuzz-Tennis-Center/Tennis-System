"use strict";

const passport = require("passport");

const User = require("../models/user"),
pasport = require("passport"),
getUserParams = body =>{
    return{ 
        name: {
            first: body.first,
            last: body.last
        },
        username: body.username,
        email: body.email,
        password: body.password,
        gender: body.gender,
        street: body.street,
        city: body.city,
        state: body.state,
        zipcode: body.zipcode,
        dob: body.dob,
        question1: body.sQuestion1,
        question2: body.sQuestion2,
        question3: body.sQuestion3,
        answer1: body.sAnswer1,
        answer2: body.sAnswer2,
        answer3: body.sAnswer3
    };
};

const { render } = require("ejs");
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const { application, response } = require("express"); 


module.exports = {
    showSignIn: (req, res) => {
        res.render("signin");
    },
    showSignUp: (req, res) => {
        res.render("signup");
    },
    userAuthentication: (req, res, next) => {
        if (req.skip) return next();
        User.findOne({username: req.body.username}, function (err, user){
            if (user) {
                req.flash("error", `${user.username} is taken!`);
                res.locals.redirect = "/signup";
                next();
            }
            else{

                User.findOne({email: req.body.email}, function (err, user) {
                    if (user) {
                        req.flash("error", `${user.email} is taken!`);
                        res.locals.redirect = "/signup";
                        next();
                    }
                    else{
                        let newUser = new User(getUserParams(req.body));
                        User.register(newUser, req.body.password,(error, user) =>{
                            if(user){
                                console.log("hurray")
                                req.flash("success", "Account was sucessfully created");
                                res.locals.redirect = "/thanks";
                                next();
                            }
                            else{
                                req.flash("error", " Account couldn't be created");
                                res.locals.redirect = "/signup";
                                next();
                            }
                        })
                    }
                });
            }
        });
    },
    validate: (req,res,next) =>{

        req
        .sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        })
        .trim();
        req.check("email", "Email is invalid").isEmail().notEmpty();
        req.check("password", "Password cannot be empty").notEmpty();
        req.check("username", "Username cannot be empty").notEmpty();
        req.check("gender", "Gender cannot be empty").notEmpty();
        req.check("dob", "Birthday cannot be empty").notEmpty();
        req.check("street", "street cannot be empty").notEmpty();
        req.check("city", "city cannot be empty").notEmpty();
        req.check("zipcode", "zipcode cannot be empty").notEmpty().isInt().isLength({
            min:5,
            max:5
        }).equals(req.body.zipcode);

        req.getValidationResult().then(error => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.skip = true;
                req.flash("error", messages.join(" and "));
                res.locals.redirect = "/signup";
                next();
            } 
            else {
                next();
            }
        });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    },

    logout:(req,res,next) =>{
        req.logout();
        req.flash("success", "You have been logged out");
        res.locals.redirect ="/";
        next();

    },
    authenticate: passport.authenticate("local", {
        successFlash:"Sucessfully logged in!",
        successRedirect: "/signin",
        failureRedirect:"/signin",
        failureFlash: "Invalid email or password"
    })

};
           
    
    
    
