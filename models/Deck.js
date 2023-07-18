import mongoose from "mongoose";

const DeckSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  deckName: {
    type: String,
    required: true,
  },
});

// Compound index, so deckName is unique for documents with the same courseId:

DeckSchema.index({ courseId: 1, deckName: 1 }, { unique: true });

export default mongoose.models.Deck || mongoose.model("Deck", DeckSchema);
