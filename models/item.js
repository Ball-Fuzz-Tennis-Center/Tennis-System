"use strict";

const mongoose =require("mongoose"),
{ Schema } = mongoose,
passportLocalMongose = require("passport-local-mongoose"),

itemSchema = new Schema(
    {
        
        companyName: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        
        },
        count:{
            type: Number,
            required: true
        },
        size:{
            type: String,
            required: true
           
        },
        price:{
            type: Number,
            required: true
        },
        image:{
            
            required: true
        }

    },
    {
        timestamps: true
    }
);

userSchema.virtual("fullName").get(function() {
    return `${this.name.companyName} ${this.name.model}`;
});
module.exports = mongoose.model("Item", userSchema);