const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  likes: [{ type: String, default: 0 }],

  comments: [{ type: String, default: 0 }],

  postBy: {
    type: String,
    required: true
  },

  postById: {
    type: String
  },
  userName: {
    type: String
  },

  liked: {
    type: Boolean,
    default: false
  }
});

module.exports = Post = mongoose.model("myPost", PostSchema);
