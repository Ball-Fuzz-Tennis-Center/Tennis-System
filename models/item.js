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
        size:{
            type: String,
            required: true
           
        },
        price:{
            type: Number,
            required: true
        },
        image:{
            type: String,
            required: true
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

userSchema.virtual("fullName").get(function() {
    return `${this.name.companyName} ${this.name.model}`;
});
module.exports = mongoose.model("Item", userSchema);