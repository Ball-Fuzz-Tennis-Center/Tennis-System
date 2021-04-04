const { render } = require("ejs");
const{ body, validationResult }   = require('express-validator');

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
    let errorMessage ="";
    let email = req.body.email;
    let username = req.body.username;
        
   
    User.findById(username, function (err, user){
        if(user== true){
            errorMessage ="username exists";
            console.log(`Sent a response : ${errorMessage}`);
            next();
            
        }
        else {
            User.findById(email, function (err, user){
                if(user == true){
                    errorMessage ="email exists";
                    console.log(`Sent a response : ${errorMessage}`);
                    next();
                   
                }
                else {
                    body(req.body.first).notEmpty(); body(req.body.last).notEmpty();
                    body(req.body.username).notEmpty();  body(req.body.Street).notEmpty();
                    body(req.body.City).notEmpty();  body(req.body.State).notEmpty();
                    body(req.body.zipCode).notEmpty();  body(req.body.DOB).notEmpty();
                    body(req.body.email).notEmpty().isEmail();

                    const result = validationResult(req);

                    if(!result.isEmpty()){
                        errorMessage ="a field is empty";
                        console.log(`Sent a response : ${errorMessage}`);
                        next();
                    }
                    else{
                        let newUser = new User({
                            first: req.body.first,
                            last: req.body. last,
                            username: req.body. username,
                            gender: req.body.gender,
                            Street: req.body.Street,
                            City:req.body.City,
                            State:req.body.State,
                            zipCode:req.body.zipCode,
                            DOB: req.body.DOB,
                            email: req.body.email,
                            password: req.body.password,
                            conpassword: req.body.conpassword,
                            SQuestion1: req.body.SQuestion1,
                            SQuestion2: req.body.SQuestion2,
                            SQuestion3: req.body.SQuestion3,
                            Question1: req.body.Question1,
                            Question2: req.body.Question2,
                            Question3: req.body.Question3
                            
                        });
                        newUser.save().
                        then(() =>{
                            res.render("thanks");
                        })
                        .catch(error => { console.log(error)});
                    }
                }
            });
        }
    });  
            
    
    
    
};
exports.loginAuthenticate = (req, res, next) => {

    let username = req.body.username;
    let message ='';
    
    login = User.findById(username).exec();
    if(!login){
        message ="wrong username or password";
        console.log(`Sent a response : ${message}`);
        res.render("signin");
        
    }
    else if (login.password == req.body.password){
        message ="You are signed in !!";
        console.log(`Sent a response : ${message}`);
        res.render("signin");
    }
    else{
        message ="wrong username or password";
        console.log(`Sent a response : ${message}`);
        res.render("thanks");
        

    }
};
    

    
    
    
    
    
    
    
    
     
    

    
    



    
  
