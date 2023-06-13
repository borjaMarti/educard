const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true
  },
  studentIds: {
    type: [String]
  },
  deckIds: {
    type: [String]
  }
});

module.exports = mongoose.model('Class', ClassSchema);