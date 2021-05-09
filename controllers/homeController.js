"use strict";

module.exports = {
    showIndex: (req, res) => {
        res.render("index");
    },
    showCalendar: (req, res) => {
        res.render("calendar");
    },
    showShop: (req, res) => {
        res.render("shop");
    }
};
