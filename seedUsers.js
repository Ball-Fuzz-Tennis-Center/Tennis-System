"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user"),
  CourtReservationDate = require("./models/courtReservationDate"),
  LessonReservationDate = require("./models/lessonReservationDate");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/tennis-system", 
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection;

// user json

// User Data

var users = [
  {
    name: {
      first: "Jon",
      last: "Wexler"
    },
    username: "wex",
    email: "jon@jonwexler.com",
    password: "12346Pa!",
    gender: "male",
    dob: "03/21/2000",
    role: "standard"
  },
  {
    name: {
      first: "Chef",
      last: "Eggplant"
    },
    username: "chefE",
    gender:"male",
    email: "eggplant@recipeapp.com",
    dob: "03/21/2001",
    password: "12345Pa@",
    role: "standard"
  },
  {
    name:{
      first: "Professor",
      last: "Souffle"
    },
    username: "profS",
    gender:"male",
    email: "souffle@recipeapp.com",
    dob: "03/21/2002",
    password: "12348Pa!",
    role: "standard"
  },
  {
    name: {
      first: "Admin",
      last: "Admin"
    },
    username: "Administrator",
    gender: "other",
    email: "admin@ballfuzz.tennis",
    dob: "01/01/1900",
    password: "tennis",
    role: "admin"
  }
];
let registerUser = (u, resolve) => {
    User.register(
      {
        name: {
          first: u.name.first,
          last: u.name.last
        },
        username:u.username,
        gender:u.gender,
        email: u.email,
        dob: u.dob,
        password: u.password,
        role: u.role
      },
      u.password,
      (error, user) => {
        console.log("User created");
        resolve(user);
      }
    );
  };
  
  users.reduce(
    (promiseChain, next) => {
      return promiseChain.then(
        () =>
          new Promise(resolve => {
            registerUser(next, resolve);
          })
      );
    },
    User.remove({})
      .exec()
      .then(() => {
        console.log("User data is empty!");
      })
  )
      .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });
  