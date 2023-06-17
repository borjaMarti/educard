import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  courseId: {
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

export default mongoose.models.Card || mongoose.model('Card', CardSchema);