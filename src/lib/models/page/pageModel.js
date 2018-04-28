const mongoose = require('mongoose');
const { UtilsService } = require('../../../lib/services');

const PageSchema = new mongoose.Schema({
  app: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'page'
  },
  name: {
    type: String,
    trim: true
  },
  slug: {
    type: String
  },
  widgets: {
    type: []
  },
  active: {
    type: Boolean,
    default: false
  },
  primary: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date
  }
});

PageSchema.pre('save', function(next) {
  this.slug = UtilsService.generateSlug(this.slug);
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('page', PageSchema);
