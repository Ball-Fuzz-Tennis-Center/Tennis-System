"use strict";

const passport = require("passport");

const CourtReservationDate = require("../models/courtReservationDate");
const LessonReservationDate = require("../models/lessonReservationDate");

const User = require("../models/user"),
  pasport = require("passport"),
  getUserParams = body => {
    return {
      name: {
        first: body.first,
        last: body.last
      },
      username: body.username,
      email: body.email,
      password: body.password,
      gender: body.gender,
      street: body.street,
      city: body.city,
      state: body.state,
      zipcode: body.zipcode,
      dob: body.dob,
      question1: body.sQuestion1,
      question2: body.sQuestion2,
      question3: body.sQuestion3,
      answer1: body.sAnswer1,
      answer2: body.sAnswer2,
      answer3: body.sAnswer3
    };
  };

const { render } = require("ejs");
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const { application, response } = require("express");


module.exports = {
  showSignIn: (req, res) => {
    res.render("users/signin");
  },

  showSignUp: (req, res) => {
    res.render("users/signup");
  },

  showChangePassword: (req, res) => {
    res.render("users/change-password");
  },

  create: (req, res, next) => {
    if (req.skip) return next();
    User.findOne({ username: req.body.username }, function (err, user) {
      if (user) {
        req.flash("error", `${user.username} is taken!`);
        res.locals.redirect = "/users/new";
        next();
      }
      else {

        User.findOne({ email: req.body.email }, function (err, user) {
          if (user) {
            req.flash("error", `${user.email} is taken!`);
            res.locals.redirect = "/users/new";
            next();
          }
          else {
            let newUser = new User(getUserParams(req.body));
            User.register(newUser, req.body.password, (error, user) => {
              if (user) {
                req.flash("success", "Successfully created account. Please sign in once again.");
                res.locals.redirect = "/";
                next();
              }
              else {
                req.flash("error", "Failed to create account.");
                res.locals.redirect = "/users/new";
                next();
              }
            })
          }
        });
      }
    });
  },

  validate: (req, res, next) => {
    req
      .sanitizeBody("email").normalizeEmail({
        all_lowercase: true
      })
      .trim();
    req.check("email", "Email is invalid").isEmail().notEmpty();
    req.check("password", "Password cannot be empty").notEmpty();
    req.check("username", "Username cannot be empty").notEmpty();
    req.check("gender", "Gender cannot be empty").notEmpty();
    req.check("dob", "Birthday cannot be empty").notEmpty();
    req.check("street", "street cannot be empty").notEmpty();
    req.check("city", "city cannot be empty").notEmpty();
    req.check("zipcode", "zipcode cannot be empty").notEmpty().isInt().isLength({
      min: 5,
      max: 5
    }).equals(req.body.zipcode);

    req.getValidationResult().then(error => {
      if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      }
      else {
        next();
      }
    });
  },

  validateUpdate: (req, res, next) => {
    req.check("username", "Username cannot be empty").notEmpty();
    req.check("street", "street cannot be empty").notEmpty();
    req.check("city", "city cannot be empty").notEmpty();
    req.check("zipcode", "zipcode cannot be empty").notEmpty().isInt().isLength({
      min: 5,
      max: 5
    }).equals(req.body.zipcode);

    req.getValidationResult().then(error => {
      if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      }
      else {
        next();
      }
    });
  },

  authenticate: passport.authenticate("local", {
    successRedirect: "/",
    successFlash: "Successfully signed in.",

    failureRedirect: "/users/signin",
    failureFlash: "Invalid email or password."
  }),

  changeUserPassword: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    let newPassword = req.body.newPassword;
    let confirmNewPassword = req.body.confirmNewPassword;

    if (newPassword != confirmNewPassword) {
      res.locals.redirect = `/users/${currentUser._id}/change-password`;
      req.flash("error", "Passwords do not match.");
      next();
    }

    User.findById(currentUser._id).then(function (sanitizedUser) {
      if (sanitizedUser) {
        sanitizedUser.setPassword(newPassword, function () {
          sanitizedUser.save();
          res.locals.redirect = `/users/${currentUser._id}`;
          req.flash("success", "Password changed successfully.");
          next();
        });
      } else {
        res.locals.redirect = `/users/${currentUser._id}`;
        req.flash("error", "Server Error: Failed to change password!");
        next();
      }
    }, function (err) {
      console.error(err);
    });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res) => {
    let currentUser = res.locals.currentUser;

    CourtReservationDate.find({}, function (err, courtDates) {
      if (err != undefined) { console.log(`Failed to fetch court reservation dates: ${err.message}`); }

      courtDates.sort((a, b) => (a.date > b.date) ? 1 : -1);

      LessonReservationDate.find({}, function (err, lessonDates) {
        if (err != undefined) { console.log(`Failed to fetch lesson reservation dates: ${err.message}`); }

        lessonDates.sort((a, b) => (a.date > b.date) ? 1 : -1);

        let userCourtReservations = [];
        let userLessonReservations = [];

        let jsonCourtDates = JSON.stringify(courtDates);
        let jsonLessonDates = JSON.stringify(lessonDates);

        let parsedCourtDates = JSON.parse(jsonCourtDates);
        let parsedLessonDates = JSON.parse(jsonLessonDates);

        parsedCourtDates.forEach(courtDate => {
          let iterating = false;
          let startingSlot = '';
          let endingSlot = '';
          let ballMachine = false;

          for (let timeSlot of Object.keys(courtDate.timeSlots)) {
            let currentTimeSlotValue = courtDate.timeSlots[timeSlot];

            if (!iterating) {

              if (currentTimeSlotValue != null) {
                if (currentUser != null) {
                  if (currentTimeSlotValue == currentUser._id) {
                    iterating = true;
                    startingSlot = timeSlot;

                    if (courtDate.timeSlotBallMachines[timeSlot] == true) {
                      ballMachine = true;
                    }
                  }
                }
              }
            }
            else {

              if (timeSlot == 30) {
                iterating = false;
                endingSlot = 31;
                let newDate = new Date(lessonDate.date);

                userCourtReservations.push(
                  {
                    date: newDate.toDateString(),
                    startTime: getTimeSlotValue(startingSlot),
                    endTime: getTimeSlotValue(endingSlot),
                    ballMachine: ballMachine
                  }
                );

                ballMachine = false;
              }

              if (currentTimeSlotValue == null) {
                iterating = false;
                endingSlot = timeSlot;
                let newDate = new Date(courtDate.date);
                let today = new Date();
                if (newDate >= today) {
                  userCourtReservations.push(
                    {
                      date: newDate.toDateString(),
                      startTime: getTimeSlotValue(startingSlot),
                      endTime: getTimeSlotValue(endingSlot),
                      ballMachine: ballMachine
                    }
                  );
                }

                ballMachine = false;
              }
            }
          }
        });

        parsedLessonDates.forEach(lessonDate => {
          let iterating = false;
          let startingSlot = '';
          let endingSlot = '';

          for (let timeSlot of Object.keys(lessonDate.timeSlots)) {
            let currentTimeSlotValue = lessonDate.timeSlots[timeSlot];

            if (!iterating) {

              if (currentTimeSlotValue != null) {
                if (currentUser != null) {
                  if (currentTimeSlotValue == currentUser._id) {
                    iterating = true;
                    startingSlot = timeSlot;
                  }
                }
              }
            }
            else {

              if (timeSlot == 30) {
                iterating = false;
                endingSlot = 31;
                let newDate = new Date(lessonDate.date);
                let today = new Date();
                if (newDate >= today) {
                  userLessonReservations.push(
                    {
                      date: newDate.toDateString(),
                      startTime: getTimeSlotValue(startingSlot),
                      endTime: getTimeSlotValue(endingSlot)
                    }
                  );
                }
              }

              if (currentTimeSlotValue == null) {
                iterating = false;
                endingSlot = timeSlot;
                let newDate = new Date(lessonDate.date);

                userLessonReservations.push(
                  {
                    date: newDate.toDateString(),
                    startTime: getTimeSlotValue(startingSlot),
                    endTime: getTimeSlotValue(endingSlot)
                  }
                );
              }
            }
          }
        });

        res.render("users/show",
          {
            courtReservations: userCourtReservations,
            lessonReservations: userLessonReservations
          });
      });
    });
  },
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", {
          user: user
        });
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    console.log(`CURRENT USER: ${currentUser}`);
    let userId = req.params.id,
      userParams = {
        name: {
          first: req.body.first,
          last: req.body.last
        },
        username: req.body.username,
        email: currentUser.email,
        gender: currentUser.gender,
        dob: currentUser.dob,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        question1: currentUser.question1,
        question2: currentUser.question2,
        question3: currentUser.question3,
        answer1: currentUser.answer1,
        answer2: currentUser.answer2,
        answer3: currentUser.answer3
      };
    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
      .then(user => {
        req.flash("success", "Successfully updated profile.");
        res.locals.redirect = `/users/${user._id}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        req.flash("success", "Successfully deleted account.");
        res.locals.redirect = "/";
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  },

  signOut: (req, res, next) => {
    req.logout();
    req.flash("success", "Successfully signed out.");
    res.locals.redirect = "/";
    next();
  }
};
























function getTimeSlotValue(timeSlot) {
  let timeSlotValue = "";
  let timeSlotNumber = Number(timeSlot);

  switch (timeSlotNumber) {
    case 1:
      timeSlotValue = "7:00 am";
      break;
    case 2:
      timeSlotValue = "7:30 am";
      break;
    case 3:
      timeSlotValue = "8:00 am";
      break;
    case 4:
      timeSlotValue = "8:30 am";
      break;
    case 5:
      timeSlotValue = "9:00 am";
      break;
    case 6:
      timeSlotValue = "9:30 am";
      break;
    case 7:
      timeSlotValue = "10:00 am";
      break;
    case 8:
      timeSlotValue = "10:30 am";
      break;
    case 9:
      timeSlotValue = "11:00 am";
      break;
    case 10:
      timeSlotValue = "11:30 am";
      break;
    case 11:
      timeSlotValue = "12:00 pm";
      break;
    case 12:
      timeSlotValue = "12:30 pm";
      break;
    case 13:
      timeSlotValue = "1:00 pm";
      break;
    case 14:
      timeSlotValue = "1:30 pm";
      break;
    case 15:
      timeSlotValue = "2:00 pm";
      break;
    case 16:
      timeSlotValue = "2:30 pm";
      break;
    case 17:
      timeSlotValue = "3:00 pm";
      break;
    case 18:
      timeSlotValue = "3:30 pm";
      break;
    case 19:
      timeSlotValue = "4:00 pm";
      break;
    case 20:
      timeSlotValue = "4:30 pm";
      break;
    case 21:
      timeSlotValue = "5:00 pm";
      break;
    case 22:
      timeSlotValue = "5:30 pm";
      break;
    case 23:
      timeSlotValue = "6:00 pm";
      break;
    case 24:
      timeSlotValue = "6:30 pm";
      break;
    case 25:
      timeSlotValue = "7:00 pm";
      break;
    case 26:
      timeSlotValue = "7:30 pm";
      break;
    case 27:
      timeSlotValue = "8:00 pm";
      break;
    case 28:
      timeSlotValue = "8:30 pm";
      break;
    case 29:
      timeSlotValue = "9:00 pm";
      break;
    case 30:
      timeSlotValue = "9:30 pm";
      break;
    case 31:
      timeSlotValue = "10:00 pm";
      break;
    default:
      timeSlotValue = "undefined";
      break;
  }

  return timeSlotValue;
}
