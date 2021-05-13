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