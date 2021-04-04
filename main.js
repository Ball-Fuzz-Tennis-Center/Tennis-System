const express =require("express");
const{body, validationResult } = require('express-validator');
app = express();
router = express.Router();
const bodyParser = require('body-parser');


app.set("port", process.env.PORT || 3000);

homeController = require("./controllers/homeController");
usersController = require("./controllers/usersController");
errorController = require("./controllers/errorController");


layouts = require("express-ejs-layouts");
mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tennis-system", { useNewUrlParser: true });

mongoose.Promise = global.Promise;

app.set("view engine", "ejs");
app.use(layouts);

app.get("/", homeController.showIndex);

app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: false
    })
);


app.use(express.json());


app.get("/signin", usersController.showSignIn);
app.get("/signup", usersController.showSignUp);

app.post("/signup",usersController.userAuthentication);
app.post("/signin",usersController.loginAuthenticate);

app.get("/reserve-court", homeController.showReserveCourt);
app.get("/reserve-lesson", homeController.showReserveLesson);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
});