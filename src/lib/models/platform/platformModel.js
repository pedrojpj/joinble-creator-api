const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  code: {
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

module.exports = mongoose.model('platform', PlatformSchema);
