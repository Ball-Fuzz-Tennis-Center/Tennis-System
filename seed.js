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
    account: {
      username: "wex",
      email: "jon@jonwexler.com",
      password: "12346Pa!"
    },
    gender: "male",
    address: {
      zipcode: 12346
    },
    dob: "03/21/2000"
  },
  {
    name: {
      first: "Chef",
      last: "Eggplant"
    },
    account: {
      username: "chefE",
      email: "eggplant@recipeapp.com",
      password: "12345Pa@"
    },
    gender: "male",
    address: {
      zipcode: 20331
    },
    dob: "03/21/2001"
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
    User.create({
      name: {
        first: u.name.first,
        last: u.name.last
      },
      account: {
        username: u.account.username,
        email: u.account.email,
        password: u.account.password
      },
      gender: u.gender,
      address: {
        zipcode: u.address.zipcode
      },
      dob: u.dob
    })
  );
});




// Court Reservation Data

let courtReservationDates = [];

for (let i = 0; i <= 5; i++) {
  const day = new Date();
  day.setDate(day.getDate() + i);

  let timeSlots = {}
  for (let j = 0; j < 30; j++) {
    timeSlots[j + 1] = null;
  }

  courtReservationDates.push(
    CourtReservationDate.create({
      date: day,
      timeSlots: timeSlots
    })
  );
}

courtReservationDates.forEach(entry => {
  commands.push(entry);
});

// Lesson Reservation Data

let lessonReservationDates = [];

for (let i = 0; i <= 5; i++) {
  const day = new Date();
  day.setDate(day.getDate() + i);

  let timeSlots = {}
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