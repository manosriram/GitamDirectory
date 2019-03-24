const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
router.post("/userFeed", async (req, res) => {
  var sendData = [];
  const followedBy = req.body.data;
  //   console.log(followedBy);
  for (var t = 0; t < followedBy.length; t++) {
    try {
      const res1 = await Post.find({ postById: followedBy[t].id });
      sendData.push(res1);
    } catch (Er) {
      console.log(Er);
    }
  }
  console.log(sendData[0]);
  return res.json({ feedData: sendData[0] });
});

router.get("/", (req, res) => {
  res.send("Feed.JS");
});

module.exports = router;
