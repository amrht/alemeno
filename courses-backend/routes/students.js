const express = require('express');
const Student = require('../models/student');

const router = express.Router();

// Create a new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('courses');
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id }).populate('courses');
    if (!student) return res.status(404).send();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a student by ID
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).send();
    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ id: req.params.id });
    if (!student) return res.status(404).send();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
