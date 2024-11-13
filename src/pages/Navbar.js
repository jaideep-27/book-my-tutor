// src/pages/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/support-us" className="nav-link">
        Support Us
      </NavLink>
      <NavLink to="/contact" className="nav-link">
        Contact Us
      </NavLink>
    </nav>
  );
}

export default Navbar; // Ensure this line is present
