import mongoose from 'mongoose';

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

export default mongoose.models.User || mongoose.model('Card', CardSchema);