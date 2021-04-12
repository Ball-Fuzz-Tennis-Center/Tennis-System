const mongoose = require("mongoose"),
{ Schema } = require("mongoose");

TimeSlot = require("./timeSlot");

courtReservationDateSchema = new Schema(
    {
        date: {
            type: Date,
            required: true
        },
        timeslots: {
            type: [TimeSlot],
            required: false,
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("CourtReservationDate", courtReservationDateSchema);







// Each time slot is 30 minutes, starting at the time shown (7:00 am means 7:00 am to 7:30 am)

// Time Slots Key

// Courts open at 7:00 am
// 1:   7:00 am
// 2:   7:30 am
// 3:   8:00 am
// 4:   8:30 am
// 5:   9:00 am
// 6:   9:30 am
// 7:   10:00 am
// 8:   10:30 am
// 9:   11:00 am
// 10:  11:30 am
// 11:  12:00 pm
// 12:  12:30 pm
// 13:  1:00 pm
// 14:  1:30 pm
// 15:  2:00 pm
// 16:  2:30 pm
// 17:  3:00 pm
// 18:  3:30 pm
// 19:  4:00 pm
// 20:  4:30 pm
// 21:  5:00 pm
// 22:  5:30 pm
// 23:  6:00 pm
// 24:  6:30 pm
// 25:  7:00 pm
// 26:  7:30 pm
// 27:  8:00 pm
// 28:  8:30 pm
// 29:  9:00 pm
// 30:  9:30 pm
// Courts close at 10:00 pm