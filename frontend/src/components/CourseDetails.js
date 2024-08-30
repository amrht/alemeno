import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setStudent, registerCourse } from '../redux/studentSlice';
import { io } from 'socket.io-client';
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading
  const student = useSelector(state => state.student.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://alemeno-pydf.onrender.com/api/courses/${id}`)
      .then(response => setCourse(response.data))
      .catch(error => console.log(error));
  }, [id]);

  useEffect(() => {
    const socket = io('https://alemeno-pydf.onrender.com');

    // Join the room specific to the course
    socket.emit('joinRoom', id);

    // Listen for real-time updates on likes
    socket.on('likesUpdated', (updatedLikes) => {
      setCourse(prevCourse => ({
        ...prevCourse,
        likes: updatedLikes,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handleRegister = () => {
    if (student) {
      setLoading(true); // Set loading to true when the register process starts
      axios.put(`https://alemeno-pydf.onrender.com/api/students/${student._id}/register-course`, { courseId: course._id })
        .then(response => {
          dispatch(setStudent(response.data.student));
          dispatch(registerCourse(course._id));
          setCourse(response.data.course);
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false)); // Set loading to false when the process ends
    } else {
      alert('Please enter a valid student ID on the dashboard to register.');
    }
  };

  const handleLike = () => {
    axios.put(`https://alemeno-pydf.onrender.com/api/courses/${course._id}/like`)
      .then(response => {
        setCourse(prevCourse => ({
          ...prevCourse,
          likes: response.data.likes,
        }));
      })
      .catch(error => console.log(error));
  };

  const handleBack = () => {
    navigate('/courses');
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const isRegistered = student && student.courses.includes(course._id);

  return (
    <div className="course-details">
      <button onClick={handleBack} className="back-button">
        ← Back to Courses
      </button>
      
      <img src={course.thumbnail} alt={course.name} className="course-details-thumbnail" />
      <h2>{course.name}</h2>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Schedule:</strong> {course.schedule}</p>
      <p><strong>Location:</strong> {course.location}</p>
      <p><strong>Prerequisites:</strong> {course.prerequisites.join(', ')}</p>
      <h3>Syllabus</h3>
      <ul>
        {course.syllabus.map((week, index) => (
          <li key={index}>
            <strong>Week {week.week}:</strong> {week.topic} - {week.content}
          </li>
        ))}
      </ul>

      <h3>Registered Students</h3>
      <div className="students-list">
        {course.students.length > 0 ? (
          course.students.map(student => (
            <div key={student._id} className="student-card">
              <h4>{student.name}</h4>
              <p><strong>Email:</strong> {student.email}</p>
            </div>
          ))
        ) : (
          <p>No students registered yet.</p>
        )}
      </div>

      <div className="likes-section" style={{ marginTop: '10px' }}>
        <button onClick={handleLike} className="like-button">
          👍 Like
        </button>
        <p>{course.likes} {course.likes === 1 ? 'Like' : 'Likes'}</p>
      </div>

      {!isRegistered && (
        <button onClick={handleRegister} className="register-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register for this course'}
        </button>
      )}
      {isRegistered && (
        <p>You are already registered for this course.</p>
      )}
    </div>
  );
};

export default CourseDetails;
