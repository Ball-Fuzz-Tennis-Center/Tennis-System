"use strict";

const express = require("express"),
app = express(),
router = express.Router(),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts");
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');

const homeController = require("./controllers/homeController");
const usersController = require("./controllers/usersController");
const errorController = require("./controllers/errorController");

app.set("port", process.env.PORT || 3000);

const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/tennis-system", 
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

app.set("view engine", "ejs");
app.use(
    express.urlencoded({
        extended: false
    })
);

router.use(express.json());
router.use(layouts);
router.use(express.static("public"));
router.use(methodOverride("_method", { methods: ["GET", "POST"] }));

router.get("/", homeController.showIndex);

router.get("/signin", usersController.showSignIn);
router.get("/signup", usersController.showSignUp);

router.post("/signup", usersController.userAuthentication);
router.post("/signin", usersController.loginAuthenticate);

router.get("/reserve-court", homeController.showReserveCourt);
router.get("/reserve-lesson", homeController.showReserveLesson);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
});