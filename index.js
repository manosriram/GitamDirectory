const bodyparser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./setup/url").mongoURL;
const key = require("./setup/url").secret;
const cookieparser = require("cookie-parser");
const session = require("express-session");
const port = process.env.PORT || 5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

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

app.use(cookieparser());
app.use("/myuploads", express.static("./public/myuploads/"));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected Succesfully!"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello, World!!");
});

app.listen(port, () => console.log(`Server at ${port}`));
