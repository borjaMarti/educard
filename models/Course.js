import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  courseName: {
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

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);