"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user"),
  Item = require("./models/item");

mongoose.connect("mongodb://localhost:27017/tennis-system");
mongoose.connection;

var commands = [];

let shopItems = [
    {
        manufacturer: 'Babolat',
        model: 'Pure Drive 107 2021',
        price: 209,
        image: '/images/tennis.jpg',
        quantity: 9
    },
    {
        manufacturer: 'Head',
        model: 'Gravity S 2021',
        price: 189,
        image: '/images/tennis.jpg',
        quantity: 17
    },
    {
        manufacturer: 'Prince',
        model: 'Warrior 107',
        price: 129,
        image: '/images/tennis.jpg',
        quantity: 10
    },
    {
        manufacturer: 'Head',
        model: 'Tour Team 9R Supercombi Bag Red',
        price: 84,
        image: '/images/tennis.jpg',
        quantity: 16
    },
    {
        manufacturer: 'Dunlop',
        model: 'FX Performance Bag Black/Blue',
        price: 129,
        image: '/images/tennis.jpg',
        quantity: 8
    },
    {
        manufacturer: 'Penn',
        model: 'Tour Extra Duty 24 Can Case',
        price: 79,
        image: '/images/tennis.jpg',
        quantity: 35
    }
];

shopItems.forEach(item => {
    commands.push(
        Item.create({
            manufacturer: item.manufacturer,
            model: item.model,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        })
    );
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });