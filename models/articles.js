const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id:{
        type: String,
        required: true
    },
  author: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  img: {
    type: String
  },

  comments: [
    {
      commentId:{
        type: String,
        required: true
      },
      user: {
        type: String
      },
      text:{
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('post', PostSchema);