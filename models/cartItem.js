"use strict";

const mongoose =require("mongoose"),
{ Schema } = mongoose,


cartItemSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        itemId: {
            type: String,
            required: true
        },
        manufacturer: {
            type: String,
            required: true
        },
        model: {
            type: String,
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
        quantity: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("CartItem", cartItemSchema);