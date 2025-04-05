const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  cover_image: {
    type: String,
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  read_time: {
    type: Number,
    default: 5
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);
