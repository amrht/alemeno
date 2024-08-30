const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  email: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

module.exports = mongoose.model('Student', studentSchema);
