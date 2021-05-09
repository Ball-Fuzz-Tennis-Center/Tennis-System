"use strict";

module.exports = {
    showIndex: (req, res) => {
        res.render("index");
    },
    showCaledar: (req, res) => {
        res.render("calendar");
    }
};
