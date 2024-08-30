const express = require('express');
const Course = require('../models/course');

const router = express.Router();

// Create a new course
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id })
      .populate('students', '-courses') // Populate students and exclude their courses field if not needed
      .exec();

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Update a course by ID
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).send();
    res.send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a course by ID
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ id: req.params.id });
    if (!course) return res.status(404).send();
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
