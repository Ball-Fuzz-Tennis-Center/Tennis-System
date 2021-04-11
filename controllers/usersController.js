"use strict";

const User = require("../models/user");

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
        let errorMessage = "";
        let email = req.body.email;
        let username = req.body.username;


        User.findById(username, function (err, user) {
            if (user == true) {
                errorMessage = "username exists";
                console.log(`Sent a response : ${errorMessage}`);
                next();

            }
            else {
                User.findById(email, function (err, user) {
                    if (user == true) {
                        errorMessage = "email exists";
                        console.log(`Sent a response : ${errorMessage}`);
                        next();

                    }
                    else {
                        body(req.body.first).notEmpty(); body(req.body.last).notEmpty();
                        body(req.body.username).notEmpty(); body(req.body.street).notEmpty();
                        body(req.body.city).notEmpty(); body(req.body.state).notEmpty();
                        body(req.body.zipcode).notEmpty(); body(req.body.dob).notEmpty();
                        body(req.body.email).notEmpty().isEmail();

                        const result = validationResult(req);

                        if (!result.isEmpty()) {
                            errorMessage = "a field is empty";
                            console.log(`Sent a response : ${errorMessage}`);
                            next();
                        }
                        else {
                            let newUser = new User(
                                {
                                    name: {
                                        first: req.body.first,
                                        last: req.body.last
                                    },
                                    account: {
                                        username: req.body.username,
                                        email: req.body.email,
                                        password: req.body.password
                                    },
                                    gender: req.body.gender,
                                    address: {
                                        street: req.body.street,
                                        city: req.body.city,
                                        state: req.body.state,
                                        zipcode: req.body.zipcode,
                                    },
                                    dob: req.body.dob,
                                    security: {
                                        question1: req.body.sQuestion1,
                                        question2: req.body.sQuestion2,
                                        question3: req.body.sQuestion3,
                                        answer1: req.body.sAnswer1,
                                        answer2: req.body.sAnswer2,
                                        answer3: req.body.sAnswer3
                                    }
                                }
                            );
                            newUser.save().
                                then(() => {
                                    res.render("thanks");
                                })
                                .catch(error => { console.log(error) });
                        }
                    }
                });
            }
        });
    },
    loginAuthenticate: (req, res, next) => {
        let username = req.body.username;
        let message = '';

        login = User.findById(username).exec();
        if (!login) {
            message = "wrong username or password";
            console.log(`Sent a response : ${message}`);
            res.render("signin");

        }
        else if (login.password == req.body.password) {
            message = "You are signed in !!";
            console.log(`Sent a response : ${message}`);
            res.render("signin");
        }
        else {
            message = "wrong username or password";
            console.log(`Sent a response : ${message}`);
            res.render("thanks");
        }
    }
};