"use strict";

const Item = require("../models/item");
const CartItem = require("../models/cartItem");
const user = require("../models/user");

module.exports = {
    
    index: (req, res) => {

        let currentUser = res.locals.currentUser;

        Item.find().then(items => {
            CartItem.find().then(cartItems => {
                let userCartItems = [];

                if (currentUser != null) {
                    cartItems.forEach(cartItem => {
                        if (cartItem.userId == currentUser._id) { userCartItems.push(cartItem); }
                    });
                }
                res.render("items/index", {items: items, cartItems: userCartItems});
            });
        });
    },

    show: (req,res, next) => {
        let itemId = req.params.id;
        Item.findById(itemId)
        .then( item => {
            res.render("items/show", {item: item});
        })
        .catch( error => {
            console.log(`Error fetching course by ID: ${error.message}`);
        })
    },

    new: (req, res) => {
        res.render("items/new");
    },

    edit: (req, res) => {
        let itemId = req.params.id;
        Item.findById(itemId).then(item => {
            res.render("items/edit", {item: item});
        })
        .catch(error => {
            req.flash("error", "Internal Error: Failed to retreive item.");
            res.render("admin-dashboard");
        });
    },

    create: (req, res, next) => {
        let newItem = {
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            price: req.body.price,
            image: req.body.image,
            quantity: req.body.quantity
        };

        Item.create(newItem)
        .then(item => {
            res.locals.redirect = "/admin-dashboard";
            req.flash("success", "Successfully added item.");
            next();
        })
        .catch( error => {
            console.log(`Error saving item: ${error.message}`);
            next(error)
        })
    },

    update: (req, res, next) => {
        let itemId = req.params.id;

        let updatedItem = {
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            price: req.body.price,
            image: req.body.image,
            quantity: req.body.quantity
        }

        Item.findByIdAndUpdate(itemId, {
            $set: updatedItem
        })
        .then(item => {
            res.locals.redirect = '/admin-dashboard';
            req.flash("success", "Successfully updated item.");
            next();
        })
        .catch(error => {
            res.locals.redirect = '/admin-dashboard';
            req.flash("error", "Internal Error: Failed to update item.");
            next();
        });
    },

    delete: (req, res, next) => {
        let itemId = req.params.id;
        Item.findByIdAndRemove(itemId)
        .then(() => {
            req.flash("success", "Successfully deleted item.");
            res.locals.redirect = "/admin-dashboard";
            next();
        })
        .catch(error => {
            req.flash("error", "Internal Error: Failed to deleted item.");
            res.locals.redirect = "/admin-dashboard";
            next();
        });
    },

    addItemToCart: (req, res, next) => {
        let userId = req.params.userId;
        let itemId = req.params.itemId;

        CartItem.find().then(cartItems => {
            cartItems.forEach(cartItem => {
                if (cartItem.itemId == itemId) {
                    let cartItemId = cartItem._id;
                    let updatedCartItem = {
                        userId: cartItem.userId,
                        itemId: cartItem.itemId
                    };

                    CartItem.findByIdAndUpdate(cartItemId, {
                        $set: updatedCartItem
                    })
                    .then(cartItem => {
                        res.locals.redirect = '/items/shop';
                        req.flash("success", "Added item to cart.");
                        next();
                    })
                    .catch(error => {
                        res.locals.redirect = '/items/shop';
                        req.flash("error", "Internal Error: Failed to add item to cart.");
                    });
                }
            });
        });

        CartItem.create({
            userId: userId,
            itemId: itemId
        })
        .then(item => {
            res.locals.redirect = '/items/shop';
            req.flash("success", "Added item to cart.");
            next();
        })
        .catch(error => {
            res.locals.redirect = '/items/shop';
            req.flash("error", "Internal Error: Failed to add item to cart.");
            next();
        });
    },

    redirectView: (req,res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath !== undefined )res.redirect(redirectPath);
        else next();
    }
}