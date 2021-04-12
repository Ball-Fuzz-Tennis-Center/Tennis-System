const mongoose = require("mongoost"),
{ Schema } = require("mongoose");

courtReservationDateSchema = new Schema(
    {
        date: {
            type: Date,
            required: true
        },
        timeslots: {

        }
    },
    {
        timestamps: true
    }
);