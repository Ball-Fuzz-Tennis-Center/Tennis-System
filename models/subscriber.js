"use strict";

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
            },
            date:{
                type : Date,
                required: true
            }
        },
        {
            timestamps: true
        }
        
    );

module.exports = mongoose.model("Subscriber", subscriberSchema);