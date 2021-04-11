"use strict";

module.exports = {
    showIndex: (req, res) => {
        res.render("index");
    },
    showReserveCourt: (req, res) => {
        res.render("reserve-court");
    },
    showReserveLesson: (req, res) => {
        res.render("reserve-lesson");
    }
};