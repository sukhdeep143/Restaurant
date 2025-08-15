
const mongoose = require('mongoose');


const Commit = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  commit:{
    type: String,
    required: true
  }
});


module.exports =  mongoose.model("CommitOnWeb", Commit );
