const passport = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, passport, done) => {})
  );
};
