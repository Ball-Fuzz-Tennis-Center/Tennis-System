"use strict";
const subscriber = require("./subscriber");


const mongoose = require("mongoose"),
    subscriberSchema = mongoose.Schema(
        {
            email:{
                type : String,
                required: true,
                unique : true
            },
            phone:{
                type : Number,
                required: true
            }
        },
        {
            timestamps: true
        }
        
    );

module.exports = mongoose.model("Subscriber", subscriberSchema);