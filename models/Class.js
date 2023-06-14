import mongoose from 'mongoose';

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

export default mongoose.models.User || mongoose.model('Class', ClassSchema);