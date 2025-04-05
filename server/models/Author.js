const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Author', AuthorSchema);
