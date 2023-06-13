const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  deckId: {
    type: String,
    required: true
  },
  front: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Card', CardSchema);