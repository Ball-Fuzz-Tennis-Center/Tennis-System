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

var commands = [];

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
