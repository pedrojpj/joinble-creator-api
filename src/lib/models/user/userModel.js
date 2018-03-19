const mongoose = require('mongoose');
const { SecureService } = require('../../../lib/services');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validator: validator.isEmail
  },
  city: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  resetPasswordToken: {
    type: String,
    trim: true
  },
  resetPasswordDateExpires: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  conditions: {
    type: Boolean
  },
  updatedAt: Date
});

UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('user', UserSchema);
