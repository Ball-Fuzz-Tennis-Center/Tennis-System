"use strict";

// Variables and dependencies

const express = require("express"),
app = express(),
router = express.Router(),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts");
//{ body, validationResult } = require("express-validator"),
//bodyParser = require('body-parser');


const cookieParser = require("cookie-parser"),
passport = require("passport"),
expressSession = require("express-session"),
expressValidator = require ("express-validator"),
connectFlash = require("connect-flash");


const homeController = require("./controllers/homeController");
const usersController = require("./controllers/usersController");
const itemsController = require("./controllers/itemsController");
const reservationController = require("./controllers/reservationController");
const errorController = require("./controllers/errorController");

const User = require("./models/user");

// Setup database connection and parameters

const mongoose = require("mongoose");
//const cookieParser = require("cookie-parser");
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/tennis-system", 
    { useNewUrlParser: true, useUnifiedTopology: true }
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
router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret :"my_passcode",
    cookie:{
        maxAge:360000
    },
    resave: false,
    saveUninitialized: false
}));


router.use(passport.initialize());
router.use(passport.session());


passport.use(User.createStrategy()); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());



router.use(layouts);
router.use(express.static("public"));
router.use(methodOverride("_method", { methods: ["GET", "POST"] }));


router.use(expressValidator());

router.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    next();
});


// Routes

router.get("/", homeController.showIndex);

// Users

router.get("/users/new", 
usersController.showSignUp);

router.post("/users/create", 
usersController.validate, 
usersController.create, 
usersController.redirectView);

router.get("/users/signin", 
usersController.showSignIn);

router.post("/users/signin", 
usersController.authenticate);

router.get("/users/signout", 
usersController.signOut, 
usersController.redirectView);

router.get("/users/:id/edit", 
usersController.edit);

router.put("/users/:id/update", 
usersController.validateUpdate, 
usersController.update, 
usersController.redirectView);

router.get("/users/:id/change-password", 
usersController.showChangePassword);

router.post("/users/:id/change-password", 
usersController.changeUserPassword, 
usersController.redirectView);

router.get("/users/:id", 
usersController.show);

router.delete("/users/:id/delete", 
usersController.delete, 
usersController.redirectView);

// Reservations

router.get("/reserve-court", 
reservationController.showReserveCourt);

router.post("/reserve-court", 
reservationController.reserveCourt, 
reservationController.redirectView);

router.get("/reserve-lesson", 
reservationController.showReserveLesson);

router.post("/reserve-lesson", 
reservationController.reserveLesson, 
reservationController.redirectView);

// Items

router.get('/items/shop', 
itemsController.index);

router.get("/items/checkout",
itemsController.checkout, 
itemsController.redirectView);

router.get("/items/new", 
usersController.authorizeRole('admin'), 
usersController.redirectView, 
itemsController.new);

router.post("/items/create", 
usersController.authorizeRole('admin'), 
usersController.redirectView, 
itemsController.create, 
itemsController.redirectView);

router.get("/items/:id/edit", 
usersController.authorizeRole('admin'), 
usersController.redirectView, 
itemsController.edit);

router.put("/items/:id/update", 
usersController.authorizeRole('admin'), 
usersController.redirectView, 
itemsController.update, 
itemsController.redirectView);

router.post("/items/add-to-cart/:userId/:itemId", 
itemsController.addItemToCart, 
itemsController.redirectView);

router.delete("/items/remove-from-cart/:userId/:itemId/:cartItemId/:quantity/delete",
itemsController.removeItemFromCart,
itemsController.redirectView);

router.get("/items/:id", 
itemsController.show);

router.delete("/items/:id/delete", 
usersController.authorizeRole('admin'), 
usersController.redirectView, 
itemsController.delete, 
itemsController.redirectView);

// Administrative Pages

router.get("/admin-dashboard", 
usersController.authorizeRole('admin'), 
usersController.redirectView, 
usersController.showAdminDashboard);

// Other Pages
router.get("/calendar", 
homeController.showCalendar);

router.post("/subscribers/create", 
homeController.createSubscribers,
homeController.redirectView);

// Errors

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

// Setup application router and start server

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
});