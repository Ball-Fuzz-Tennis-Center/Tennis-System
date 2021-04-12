"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/tennis-system");
mongoose.connection;



// User Data

var users = [
  {
    first: "Jon",
    last: "Wexler",
    username: "wex",
    gender:"male",
    email: "jon@jonwexler.com",
    zipCode: 10016,
    DOB: "03/21/2000",
    password: "12346Pa!"
  },
  {
    first: "Chef",
    last: "Eggplant",
    username: "chefE",
    gender:"male",
    email: "eggplant@recipeapp.com",
    zipCode: 20331,
    DOB: "03/21/2001",
    password: "12345Pa@"
  },
  {
    first: "Professor",
    last: "Souffle",
    username: "profS",
    gender:"male",
    email: "souffle@recipeapp.com",
    zipCode: 19103,
    DOB: "03/21/2002",
    password: "12348Pa!"
  }
];

User.deleteMany()
  .exec()
  .then(() => {
    console.log("user log is empty!");
  });
var commands =[];

users.forEach(u => {
  commands.push(
    User.create({
      first: u.first,
      last: u.last,
      username:u.username,
      gender:u.gender,
      email: u.email,
      zipCode: u.zipCode,
      DOB:u.DOB,
      password: u.password
    })
  );
});




// Court Reservation Data




Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
});