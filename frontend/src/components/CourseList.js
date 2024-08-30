import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import SearchFilter from './SearchFilter';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    axios.get('https://alemeno-pydf.onrender.com/api/courses')
      .then(response => {
        setCourses(response.data);
        setFilteredCourses(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSearchFilter = (searchTerm, status) => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (status) {
      filtered = filtered.filter(course => course.enrollmentStatus === status);
    }

    setFilteredCourses(filtered);
  };

  return (
    <div>
        <h1 style={{textAlign:'center'}}>Courses</h1>
      <SearchFilter onSearchFilter={handleSearchFilter} />
      <div className="course-list">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
