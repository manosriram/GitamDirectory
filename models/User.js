const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  rollNo: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  location: {
    type: String
  },
  year: {
    type: String
  },
  joined: {
    type: Date,
    default: Date.now
  },
  gender: {
    type: String
  },
  branch: {
    type: String
  },
  designation: {
    type: String
  },
  age: {
    type: Number
  },
  degree: {
    type: String
  },
  section: {
    type: String
  },
  isStudent: {
    type: Boolean
  },
  bio: {
    type: String
  },
  profilePic: {
    type: String
  },
  Posts: [
    {
      id: {
        type: String
      }
    }
  ]
});

module.exports = User = mongoose.model("myStudent", UserSchema);
