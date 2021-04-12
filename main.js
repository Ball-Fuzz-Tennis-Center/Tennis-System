"use strict";

// Variables and dependencies

const express = require("express"),
app = express(),
router = express.Router(),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts"),
{ body, validationResult } = require("express-validator"),
bodyParser = require('body-parser');

const homeController = require("./controllers/homeController");
const usersController = require("./controllers/usersController");
const errorController = require("./controllers/errorController");

// Setup database connection and parameters

const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/tennis-system", 
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

// Setup application environment

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(
    express.urlencoded({
        extended: false
    })
);

// Setup router environment

router.use(express.json());
router.use(layouts);
router.use(express.static("public"));
router.use(methodOverride("_method", { methods: ["GET", "POST"] }));

// Routes

router.get("/", homeController.showIndex);

router.get("/signin", usersController.showSignIn);
router.get("/signup", usersController.showSignUp);

router.post("/signup", usersController.userAuthentication);
router.post("/signin", usersController.loginAuthenticate);

router.get("/reserve-court", homeController.showReserveCourt);
router.get("/reserve-lesson", homeController.showReserveLesson);

// Setup errors

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

// Setup application router and start server

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
});