import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Education</Link>
      </div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleNavbar}>Dashboard</Link>
        <Link to="/courses" onClick={toggleNavbar}>Courses</Link>
      </div>
      <button className="navbar-toggle" onClick={toggleNavbar}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
