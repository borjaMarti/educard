import mongoose from 'mongoose';

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

export default mongoose.models.User || mongoose.model('Deck', DeckSchema);