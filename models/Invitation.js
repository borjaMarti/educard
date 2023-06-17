import mongoose from 'mongoose';

const InvitationSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
});

export default mongoose.models.Invitation || mongoose.model('Invitation', InvitationSchema);