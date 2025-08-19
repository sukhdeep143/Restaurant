const mongoose = require("mongoose");


const blog = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  para:{
    type: String,
    required: true
  }
});

const BlogPost = mongoose.model("BlogPost", blog)

module.exports = BlogPost;