import mongoose from 'mongoose';

const InvitationSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
});

export default mongoose.models.User || mongoose.model('Invitation', InvitationSchema);