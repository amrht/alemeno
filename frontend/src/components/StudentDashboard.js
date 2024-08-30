import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setStudent, clearStudent } from '../redux/studentSlice';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [studentId, setStudentId] = useState('');
  const student = useSelector(state => state.student.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Generate random progress value between 30 and 70
  const getRandomProgress = () => Math.floor(Math.random() * (70 - 30 + 1)) + 30;

  const handleSearch = () => {
    axios.get(`https://alemeno-pydf.onrender.com/api/students/${studentId}`)
      .then(response => dispatch(setStudent(response.data)))
      .catch(error => console.log(error));
  };

  const handleLogout = () => {
    dispatch(clearStudent());
  };

  const handleViewCourses = () => {
    navigate('/courses');
  };

  const handleMarkCompleted = (courseId) => {
    // Update the local state to mark the course as completed
    const updatedCourses = student.courses.map(course =>
      course._id === courseId ? { ...course, progress: 100 } : course
    );

    dispatch(setStudent({ ...student, courses: updatedCourses }));
  };

  return (
    <div className="student-dashboard">
      {!student ? (
        <div className="student-search">
          <h2>Student Login</h2>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <button onClick={handleSearch}>Login</button>
        </div>
      ) : (
        <div className="student-details">
          <h2>Welcome, {student.name}</h2>
          <p><strong>Email:</strong> {student.email}</p>
          <h3>Registered Courses</h3>
          <ul className="course-list">
            {student.courses
              .filter(course => course.name && course.instructor)
              .map(course => (
                <li key={course._id} className="course-item">
                  <div className="course-thumbnail">
                    <img src={course.thumbnail} alt={course.name} />
                  </div>
                  <div className="course-info">
                    <h4>{course.name}</h4>
                    <p><strong>Instructor:</strong> {course.instructor}</p>
                    <p><strong>Due Date:</strong> {course.dueDate}</p>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${course.progress || getRandomProgress()}%` }}></div>
                    </div>
                    <button onClick={() => handleMarkCompleted(course._id)}>Mark as Completed</button>
                  </div>
                </li>
              ))}
          </ul>
          <button onClick={handleViewCourses}>View Courses</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
