const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  body: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  likes: [{ type: String, default: 0 }],

  comments: [
    {
      byName: { type: String },
      byEmail: { type: String },
      mainBody: { type: String },
      postID: { type: String },
      default: 0
    }
  ],

  postBy: {
    type: String
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
