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
                if (date._id == req.body.dateSelect) {
                    let dateId = date._id;
                    let newTimeSlots = new Map(date.timeSlots);
                    let newTimeSlotBallMachines = new Map(date.timeSlotBallMachines);

                    let duration = Number(req.body.durationDropdown);

                    for (let i = 0; i < duration; i++) {
                        let slot = `${Number(req.body.timeDropdown) + i}`
                        newTimeSlots.set(slot, user._id);
                        if (req.body.ballMachineCheck) {
                            newTimeSlotBallMachines.set(slot, true);
                        }
                    }

                    CourtReservationDate.findByIdAndUpdate(dateId,
                        {
                            "timeSlots": newTimeSlots,
                            "timeSlotBallMachines": newTimeSlotBallMachines
                        }, function (err, result) {
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
                if (date._id == req.body.dateSelect) {
                    let dateId = date._id;
                    let newTimeSlots = new Map(date.timeSlots);
                    
                    let duration = Number(req.body.durationDropdown);

                    for (let i = 0; i < duration; i++) {
                        let slot = `${Number(req.body.timeDropdown) + i}`
                        newTimeSlots.set(slot, user._id);
                    }

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