const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Shows the Feed of the Logged-In User.
// Posts from all the users that he/she is following sorted by latest Post first.
router.post("/userFeed", async (req, res) => {
  var sendData = [];
  const follows = req.body.data;
  for (var t = 0; t < follows.length; t++) {
    try {
      const res1 = await Post.find({ postById: follows[t].id });
      if (res1[0]) {
        res1.map((el, ind) => {
          sendData.push(el);
        });
      }
    } catch (Er) {
      console.log(Er);
    }
  }
  return res.json({ feedData: sendData.reverse() });
});

router.get("/", (req, res) => {
  res.send("Feed.JS");
});

module.exports = router;
