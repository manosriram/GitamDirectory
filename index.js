const bodyparser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./setup/url").mongoURL;
const key = require("./setup/url").secret;
const cookieparser = require("cookie-parser");
const session = require("express-session");
const port = process.env.PORT || 5000;
const passport = require("passport");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Passport Config
require("./config/passport")(passport);

app.use(
  session({
    secret: key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 604800000, // 1 Week
      httpOnly: true
    }
  })
);

// Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieparser());
app.use("/myuploads", express.static("./public/myuploads/"));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected Succesfully!"))
  .catch(err => console.log(err));

app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/api"));
app.get("/", (req, res) => {
  res.send("Hello, World!!");
});

app.listen(port, () => console.log(`Server at ${port}`));
