const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

router.get("/", (req, res) => {
  res.send("Hello Auth");
});

router.post("/getUser", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      User.findOne({ email: user.email })
        .then(user1 => {
          if (user1) {
            return res.json({ user1, isLoggedIn: true });
          }
        })
        .catch(err => console.log(err));
    } else res.json({ data: "", isLoggedIn: false });
  });
});

router.get("/logout", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      res.clearCookie("auth_t");
      req.logout();
    } else {
      return res.json({ done: 0 });
    }
  });
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

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.json({ done: 0 });
      }

      bcrypt
        .compare(password, user.password)
        .then(isCorrect => {
          if (isCorrect) {
            var payload = {
              id: user.id,
              name: user.name,
              email: user.email
            };
            jsonwt.sign(payload, key, { expiresIn: 9000000 }, (err, token) => {
              res.cookie("auth_t", token, { maxAge: 90000000 });
              return res.json({ done: 1 });
            });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
