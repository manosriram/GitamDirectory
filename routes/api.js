const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

router.get("/", (req, res) => {
  res.send("API");
});

router.post("/", (req, res) => {
  res.send("API POST");
});

router.post("/deleteAllPosts", (req, res) => {
  const email = req.body.email;
  Post.deleteMany({ postBy: email })
    .then(r => console.log(r))
    .catch(err => console.log(err));
  return res.json({ deleted: true });
});

router.post("/deleteAccount", (req, res) => {
  const email = req.body.email;

  // Delete POSTS.
  Post.deleteMany({ postBy: email })
    .then(re1 => console.log("deleted!"))
    .catch(err => console.log(err));

  //Delete USER.
  User.deleteOne({ email })
    .then(re => {})
    .catch(err => console.log(err));

  res.clearCookie("auth_t");
  return res.json({ deleted: true });
});

router.post("/getAllUsers", (req, res) => {
  User.find()
    .then(people => {
      return res.json({ people: people });
    })
    .catch(err => console.log(err));
});

router.post("/deletePost", (req, res) => {
  const postID = req.body.postID;
  Post.deleteOne({ _id: postID })
    .then(r => console.log(r))
    .catch(err => console.log(err));
  return res.json({ deleted: true });
});

router.post("/getUserInfo", (req, res) => {
  const email = req.body.email;
  User.findOne({ email })
    .then(person => {
      return res.json({ user: person });
    })
    .catch(err => console.log(err));
});

router.post("/getFollowers", (req, res) => {
  const email = req.body.email;
  User.findOne({ email })
    .then(person => {
      return res.json({ followers: person.followedBy });
    })
    .catch(err => console.log(err));
});

router.post("/getFollowing", (req, res) => {
  const email = req.body.email;
  User.findOne({ email })
    .then(person => {
      return res.json({ following: person.follows });
    })
    .catch(err => console.log(err));
});

router.post("/unFollowUser", (req, res) => {
  const email = req.body.user;
  var email2;
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    email2 = user.email;
    var flag = 0;

    // email -> person2
    // email2 -> person1

    User.findOne({ email: email2 })
      .then(person1 => {
        User.findOne({ email })
          .then(person2 => {
            for (var i = 0; i < person2.followedBy.length; i++) {
              if (person2.followedBy[i].id == person1.id) {
                person2.followedBy.splice(i, 1);
                person2.save();
                flag = 1;
              }
            }

            for (var i = 0; i < person1.follows.length; i++) {
              if (person1.follows[i].id == person2.id) {
                person1.follows.splice(i, 1);
                person1.save();
                flag = 1;
              }
            }

            if (flag === 1) {
              return res.json({ unFollowed: true });
            } else res.json({ unFollowed: false });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
});

router.post("/getFollowStatus", (req, res) => {
  const email = req.body.email;
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    User.findOne({ email })
      .then(person => {
        var flag = 0;
        for (var t = 0; t < person.followedBy.length; t++) {
          if (person.followedBy[t].id == user.id) {
            flag = 1;
            break;
          }
        }
        if (flag == 1) {
          return res.json({ following: true });
        } else return res.json({ following: false });
      })
      .catch(err => console.log(err));
  });
});

router.post("/followUser", (req, res) => {
  const email = req.body.user;
  var email2, id;
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      email2 = user.email;
      id = user.id;
    }
  });

  // email -> person2
  // email2 -> person1

  User.findOne({ email: email2 })
    .then(person1 => {
      User.findOne({ email: email })
        .then(person2 => {
          var flag = 0;

          for (var i = 0; i < person1.follows.length; i++) {
            if (person1.follows[i]._id == person2.id) {
              flag = 1;
              break;
            }
          }

          if (flag === 0) {
            person1.follows.push({
              id: person2._id,
              name: person2.name,
              email: person2.email
            });
            person1.save();
            person2.followedBy.push({
              id: person1._id,
              name: person1.name,
              email: person1.email
            });
            person2.save();
            return res.json({ followed: true });
          } else res.json({ followed: true });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post("/getUser/:email", (req, res) => {
  const email = req.params.email;
  User.findOne({ email })
    .then(person => {
      if (!person) {
        return res.json({ data: "" });
      }
      Post.find({ postBy: person.email })
        .then(posts => {
          return res.json({ data: person, posts: posts });
        })
        .catch(err => console.log(err));
    })
    .catch(er => console.log(er));
});

router.post("/getUserProfile", (req, res) => {
  var name = req.body.parameter;
  name = name.toLowerCase();
  User.find({ username: name }).then(people => {
    return res.json({ data: people });
  });
});

router.post("/submitStatus", (req, res) => {
  const email = req.body.userData.email;
  const status = req.body.status;
  const userID = req.body.userData._id;
  const name = req.body.userData.name;

  const newPost = new Post({
    body: status,
    postBy: email,
    postById: userID,
    userName: name
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
