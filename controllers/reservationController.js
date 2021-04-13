"use strict";

const User = require("../models/user");
const CourtReservationDate = require("../models/courtReservationDate");
const LessonReservationDate = require("../models/lessonReservationDate");

let courtReservationDates = [];

module.exports = {
    showReserveCourt: (req, res) => {
        fetchCourtReservationDatesAndShow(res);
    },
    showReserveLesson: (req, res) => {
        fetchLessonReservationDatesAndShow(res);
    },
    reserveCourt: (req, res, next) => {
        let user = User(res.locals.user);

        CourtReservationDate.find({}, function (err, dates) {
            if (err != undefined) { console.log(`Failed to fetch court reservation dates: ${err.message}`); }

            dates.forEach((date) => {
                console.log(date);
                if (date._id == req.body.dateSelect) {
                    console.log(`DateID: ${date._id} Req DateID: ${req.body.dateSelect}`)
                    let dateId = date._id;
                    console.log(date.date.toDateString());
                    console.log(dateId);
                    let newTimeSlots = new Map(date.timeSlots);
                    
                    newTimeSlots.set(req.body.timeDropdown, user._id);

                    CourtReservationDate.findByIdAndUpdate(dateId, {"timeSlots": newTimeSlots}, function (err, result) {
                        if (!err) {
                            next();
                        }
                        else {
                            console.log(`Error updating reservation! ${err}`);
                        }
                    });
                }
            });
        });
    },
    reserveLesson: (req, res) => {
        let user = User(res.locals.user);

        LessonReservationDate.find({}, function (err, dates) {
            if (err != undefined) { console.log(`Failed to fetch lesson reservation dates: ${err.message}`); }

            dates.forEach((date) => {
                console.log(date);
                if (date._id == req.body.dateSelect) {
                    console.log(`DateID: ${date._id} Req DateID: ${req.body.dateSelect}`)
                    let dateId = date._id;
                    console.log(date.date.toDateString());
                    console.log(dateId);
                    let newTimeSlots = new Map(date.timeSlots);
                    
                    newTimeSlots.set(req.body.timeDropdown, user._id);

                    LessonReservationDate.findByIdAndUpdate(dateId, {"timeSlots": newTimeSlots}, function (err, result) {
                        if (!err) {
                            next();
                        }
                        else {
                            console.log(`Error updating reservation! ${err}`);
                        }
                    });
                }
            });
        });
    }
};

function fetchCourtReservationDatesAndShow(res) {
    CourtReservationDate.find({}, function (err, dates) {
        if (err != undefined) { console.log(`Failed to fetch court reservation dates: ${err.message}`); }

        dates.sort((a, b) => (a.date > b.date) ? 1: -1);

        res.render("reserve-court", { dates: dates });
    });
}

function fetchLessonReservationDatesAndShow(res) {
    LessonReservationDate.find({}, function (err, dates) {
        if (err != undefined) { console.log(`Failed to fetch lesson reservation dates: ${err.message}`); }

        dates.sort((a, b) => (a.date > b.date) ? 1: -1);

        res.render("reserve-lesson", { dates: dates });
    });
}