import mongoose from "mongoose";

const InvitationSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

// Compound index, so courseId is unique for documents with the same userId:

InvitationSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.Invitation ||
  mongoose.model("Invitation", InvitationSchema);
