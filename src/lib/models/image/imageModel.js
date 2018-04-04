const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  image: {
    type: String,
    trim: true
  },
  token: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date
  }
});

module.exports = mongoose.model('image', ImageSchema);
