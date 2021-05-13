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
    newItem: (req, res) => {
        res.render("newItem");
    },

    createItems: (req, res, next) => {
        let newItem = {
            companyName: req.body.companyName,
            model: req.body.model,
            count: req.body.count,
            price:req.body.price,
            image:req.body.image,
            itemId:req.body. itemId


        };
        Item.create(newItem)
        .then( course => {
            res.locals.redirect = "/shop";
            res.locals.item =item;
            
            next();
        })
        .catch( error => {
            console.log(`Error saving course: ${error.message}`);
             next(error)
        })
    },

    show: (req,res, next) => {
        let itemId = req.params.id;
        Item.findById(itemId)
        .then( item => {
            res.locals.item = item;
            next();
        })
        .catch( error =>{
            console.log(`Error fetching course by ID: ${error.message}`);
        })
    },
    
    showShop: (req, res) => {
        res.render("items/shop");
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
