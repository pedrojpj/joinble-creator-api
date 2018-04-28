const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  code: {
    type: String
  },
  platforms: {
    type: []
  },
  domain: {
    type: String
  },
  icon: {
    type: String
  },
  languages: {
    type: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date
  }
});

AppSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('app', AppSchema);
