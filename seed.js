"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user"),
  CourtReservationDate = require("./models/courtReservationDate"),
  LessonReservationDate = require("./models/lessonReservationDate");

mongoose.connect("mongodb://localhost:27017/tennis-system");
mongoose.connection;



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
    zipcode: 12346,
    dob: "03/21/2000"
  },
  {
    name: {
      first: "Chef",
      last: "Eggplant"
    },
    username: "chefE",
    gender:"male",
    email: "eggplant@recipeapp.com",
    zipCode: 20331,
    dob: "03/21/2001",
    password: "12345Pa@"
  },
  {
    name:{
      first: "Professor",
      last: "Souffle"
    },
    username: "profS",
    gender:"male",
    email: "souffle@recipeapp.com",
    zipCode: 19103,
    dob: "03/21/2002",
    password: "12348Pa!"
  }
];

User.deleteMany()
  .exec()
  .then(() => {
    console.log("user log is empty!");
  });
var commands = [];

users.forEach(u => {
  commands.push(
    User.register({
      name: {
        first: u.name.first,
        last: u.name.last
      },

      username: u.username,
      email: u.email,
      password: u.password,
      gender: u.gender,
      zipcode: u.zipcode,
      dob: u.dob
    })
  );
});




// Court Reservation Data

let courtReservationDates = [];

for (let i = 0; i <= 20; i++) {
  const day = new Date();
  day.setDate(day.getDate() + i);

  let timeSlots = {};
  let timeSlotBallMachines = {};
  for (let j = 0; j < 30; j++) {
    timeSlots[j + 1] = null;
    timeSlotBallMachines[j + 1] = false;
  }

  courtReservationDates.push(
    CourtReservationDate.create({
      date: day,
      timeSlots: timeSlots,
      timeSlotBallMachines: timeSlotBallMachines
    })
  );
}

courtReservationDates.forEach(entry => {
  commands.push(entry);
});

// Lesson Reservation Data

let lessonReservationDates = [];

for (let i = 0; i <= 20; i++) {
  const day = new Date();
  day.setDate(day.getDate() + i);

  let timeSlots = {};
  for (let j = 0; j < 30; j++) {
    timeSlots[j + 1] = null;
  }

  lessonReservationDates.push(
    LessonReservationDate.create({
      date: day,
      timeSlots: timeSlots
    })
  );
}

lessonReservationDates.forEach(entry => {
  commands.push(entry);
});


Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });