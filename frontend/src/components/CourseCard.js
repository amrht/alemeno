import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.thumbnail} alt={course.name} className="course-thumbnail" />
      <div className="course-info">
        <h3>{course.name}</h3>
        <p>Instructor: {course.instructor}</p>
        <p>Duration: {course.duration}</p>
        <p>Enrollment Status: {course.enrollmentStatus}</p>
        <Link to={`/course/${course.id}`} className="details-link">Details</Link>
      </div>
    </div>
  );
};

export default CourseCard;
