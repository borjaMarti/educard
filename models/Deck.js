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

export default mongoose.models.Deck || mongoose.model('Deck', DeckSchema);