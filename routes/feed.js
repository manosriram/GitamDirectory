const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/userFeed", async (req, res) => {
  var sendData = [];
  console.log(req.body.data);
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
