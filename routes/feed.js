const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/submitComment", (req, res) => {
  const { comment, postID, name, email } = req.body;
  Post.findOne({ _id: postID })
    .then(post => {
      console.log(post);
      post.comments.push({
        byName: name,
        byEmail: email,
        mainBody: comment,
        postID: postID
      });
      post.save();
    })
    .catch(err => console.log(err));
});

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
          console.log(el);
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
