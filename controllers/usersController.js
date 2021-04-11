const { render } = require("ejs");
const { body, validationResult } = require('express-validator');

const bodyParser = require('body-parser');
const User = require("../models/user");
const { application, response } = require("express");


exports.showSignIn = (req, res) => {
    res.render("signin");
};

exports.showSignUp = (req, res) => {
    res.render("signup");
};

exports.userAuthentication = (req, res, next) => {
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
                                first: req.body.first,
                                last: req.body.last,
                                username: req.body.username,
                                gender: req.body.gender,
                                street: req.body.street,
                                city: req.body.city,
                                state: req.body.state,
                                zipcode: req.body.zipcode,
                                dob: req.body.dob,
                                email: req.body.email,
                                password: req.body.password,
                                sQuestion1: req.body.sQuestion1,
                                sQuestion2: req.body.sQuestion2,
                                sQuestion3: req.body.sQuestion3,
                                sAnswer1: req.body.sAnswer1,
                                sAnswer2: req.body.sAnswer2,
                                sAnswer3: req.body.sAnswer3
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




};
exports.loginAuthenticate = (req, res, next) => {

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
};




















