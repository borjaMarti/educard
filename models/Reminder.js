const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cardId: {
    type: String,
    required: true
  },
  deckId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  phase: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Reminder', ReminderSchema);