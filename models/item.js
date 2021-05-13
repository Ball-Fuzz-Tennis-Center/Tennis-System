"use strict";

const mongoose =require("mongoose"),
{ Schema } = mongoose,


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
        price:{
            type: Number,
            required: true
        },
        image:{
            type: String,
            required: false
        },
        itemId:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Item", itemSchema);