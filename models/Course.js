import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true,
  },
  studentIds: {
    type: [String]
  }
});

// Compound index, so courseName is unique for documents with the same ownerId:

CourseSchema.index({ ownerId: 1, courseName: 1 }, { unique: true });

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);