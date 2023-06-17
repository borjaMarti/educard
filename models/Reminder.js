import mongoose from 'mongoose';

const ReminderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true
  },
  deckId: {
    type: String,
    required: true
  },
  cardId: {
    type: String,
    required: true
  },
  phase: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

export default mongoose.models.Reminder || mongoose.model('Reminder', ReminderSchema);