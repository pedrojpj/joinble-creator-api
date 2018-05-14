const mongoose = require('mongoose');

const WidgetSchema = new mongoose.Schema({
  name: {
    type: {},
    required: true
  },
  description: {
    type: {}
  },
  icon: {
    type: String
  },
  repeat: {
    type: Boolean,
    default: false
  },
  type: {
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
