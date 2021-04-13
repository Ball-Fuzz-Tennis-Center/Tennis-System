"use strict";

const CourtReservationDate = require("../models/courtReservationDate");
const LessonReservationDate = require("../models/lessonReservationDate");

let courtReservationDates = [];

module.exports = {
    showIndex: (req, res) => {
        res.render("index");
    },
    showReserveCourt: (req, res) => {
        fetchCourtReservationDatesAndShow(res);
    },
    showReserveLesson: (req, res) => {
        fetchLessonReservationDatesAndShow(res);
    }
};

function fetchCourtReservationDatesAndShow(res) {
    CourtReservationDate.find({}, function (err, dates) {
        if (err != undefined) { console.log(`Failed to fetch court reservation dates: ${err.message}`); }

        dates.sort((a, b) => (a.date.getDay() > b.date.getDay()) ? 1: -1);

        res.render("reserve-court", { dates: dates });
    });
}

function fetchLessonReservationDatesAndShow(res) {
    LessonReservationDate.find({}, function (err, dates) {
        if (err != undefined) { console.log(`Failed to fetch lesson reservation dates: ${err.message}`); }

        dates.sort((a, b) => (a.date.getDay() > b.date.getDay()) ? 1: -1);

        res.render("reserve-lesson", { dates: dates });
    });
}