// src/App.js

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AvailableSlotsPage from './pages/AvailableSlotsPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import HomePage from './pages/HomePage';
import InstructorPage from './pages/InstructorPage';
import LearnWithAI from './pages/learnWithAI';
import Navbar from './pages/Navbar'; // Ensure Navbar is in the correct directory
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import RoleSelectionPage from './pages/RoleSelectionPage';
import StudentPage from './pages/StudentPage';
import SubjectSelect from './pages/SubjectSelect';
import SupportUs from './pages/SupportUs';  // Ensure the path matches
import SelectSubjectPage from './pages/SelectSubjectPage';
import DaaPage from './pages/DaaPage';
import NQueen from './pages/NQueen';
import KnapsackGame from './pages/KnapsackGame';
import NColoringGame from './pages/NColoringGame';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      {/* Fixed Navbar */}
      <Navbar />
      
      <div className="content" style={{ paddingTop: '60px' }}>
        {/* Defining Routes for different pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
          <Route path="/instructor" element={<InstructorPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
          <Route path="/available-slots" element={<AvailableSlotsPage />} />
          <Route path="/learn-with-ai" element={<LearnWithAI />} />
          <Route path="/select" element={<SubjectSelect />} />
          <Route path="/quiz/:subject" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/support-us" element={<SupportUs />} />
          <Route path="/subject" element={<SelectSubjectPage />} />
          <Route path="/daa" element={<DaaPage />} />
          <Route path="/nqueen" element={<NQueen />} />
          <Route path="/knapsack-game" element={<KnapsackGame />} />
          <Route path="/ncoloring-game" element={<NColoringGame />} /> 
          <Route path="/contact" element={<Contact />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
