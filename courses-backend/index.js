const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Import models
const Student = require('./models/student');
const Course = require('./models/course');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust according to your frontend origin
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const mongoUri = 'mongodb+srv://arhayat7:UDNhuMzrHvsr3IeV@cluster0.jpujb.mongodb.net/courses?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Routes
const coursesRouter = require('./routes/courses');
const studentsRouter = require('./routes/students');

app.use('/api/courses', coursesRouter);
app.use('/api/students', studentsRouter);

// Socket.IO setup for real-time updates
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (courseId) => {
    socket.join(courseId);
    console.log(`User ${socket.id} joined room ${courseId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Like a course
app.put('/api/courses/:id/like', async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.likes += 1;
    await course.save();

    // Notify clients about the updated likes count via Socket.IO
    io.to(id).emit('likesUpdated', course.likes);

    res.status(200).json({ likes: course.likes });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Register a student for a course
app.put('/api/students/:studentId/register-course', async (req, res) => {
  const { studentId } = req.params;
  const { courseId } = req.body;

  try {
    // Find the student and course
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Add the course to the student's registered courses if not already registered
    if (!student.courses.includes(courseId)) {
      student.courses.push(courseId);
    }

    // Add the student to the course's student list if not already registered
    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
    }

    // Save both student and course
    await student.save();
    await course.save();

    // Optionally, populate the student and course details before sending the response
    const updatedStudent = await Student.findById(studentId).populate('courses');
    const updatedCourse = await Course.findById(courseId).populate('students');

    res.status(200).json({ student: updatedStudent, course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 1337;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
