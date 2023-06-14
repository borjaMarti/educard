import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
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

export default mongoose.models.User || mongoose.model('Course', CourseSchema);