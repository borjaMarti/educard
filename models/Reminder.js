import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  deckId: {
    type: String,
    required: true,
  },
  cardId: {
    type: String,
    required: true,
  },
  phase: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Compound index, so cardId is unique for documents with the same userId:

ReminderSchema.index({ userId: 1, cardId: 1 }, { unique: true });

export default mongoose.models.Reminder ||
  mongoose.model("Reminder", ReminderSchema);
