const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.send("Hello Auth");
});

router.post("/register", (req, res) => {
  var {
    name,
    email,
    pass,
    gender,
    degree,
    section,
    year,
    date,
    roll,
    location,
    age,
    designation,
    isStudent
  } = req.body;

  User.findOne({ email: email }).then(user => {
    if (!user) {
      const user = new User({
        name: name,
        email: email,
        password: pass,
        gender: gender,
        degree: degree,
        section: section,
        year: year,
        joined: date,
        rollNo: roll,
        location: location,
        age: age,
        designation: designation,
        isStudent: isStudent
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          user.save().catch(err => console.log(err));
        });
      });
      return res.json({ done: 1 });
    } else {
      return res.json({ done: 0 });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.statusCode(404).json({ done: 0 });
    }
    console.log(user);
    var payload = {};
    payload.name = user.name;
    payload.email = user.email;
    payload.location = user.location;

    if (user.isStudent === false) {
    }
    payload.designation = user.designation;
    payload.age = user.age;
    payload.year = user.year;
    // payload.
  });
});

module.exports = router;
