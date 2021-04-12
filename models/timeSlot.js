const mongoose = require("mongoose"),
{ Schema } = require("mongoose");

const User = require("./user");

timeSlotSchema = new Schema(
    {
        timeSlot: {
            type: Number,
            required: true,
            min: 1,
            max: 30
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: false
        }
    }
);

module.exports = mongoose.model("TimeSlot", timeSlotSchema);