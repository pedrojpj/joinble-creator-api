const mongoose = require('mongoose');

const WidgetSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: {}
  },
  repeat: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    required: true
  },
  content: [],
  styles: {},
  selector: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

WidgetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('widget', WidgetSchema);
