import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
