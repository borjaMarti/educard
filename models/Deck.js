const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
  deckName: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Deck', DeckSchema);