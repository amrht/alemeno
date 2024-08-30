const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String },
  enrollmentStatus: { type: String },
  thumbnail: { type: String },
  duration: { type: String },
  schedule: { type: String },
  location: { type: String },
  prerequisites: [{ type: String }],
  syllabus: [
    {
      week: { type: Number },
      topic: { type: String },
      content: { type: String },
    },
  ],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  likes: { type: Number, default: 0 },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
