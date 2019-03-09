const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("API");
});

router.post("/", (req, res) => {
  res.send("API POST");
});

router.post("/getUserProfile", (req, res) => {
  var name = req.body.parameter;
  var users = [];
  name = name.toLowerCase();
  User.find({ username: name }).then(people => {
    return res.json({ data: people });
  });
});

router.post("/submitStatus", (req, res) => {
  const email = req.body.userData.email;
  const status = req.body.status;

  const newPost = new Post({
    body: status,
    postBy: email
  });
  newPost.save();

  User.findOne({ email: email })
    .then(person => {
      person.Posts.push(newPost._id);
      person.save();
    })
    .catch(err => console.log(err));
});

router.post("/getAllUserPosts", (req, res) => {
  const email = req.body.email; // email of profile user.

  Post.find({ postBy: email }).then(data => {
    return res.json(data);
  });
});

module.exports = router;
