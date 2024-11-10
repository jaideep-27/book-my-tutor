import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StudentPage.css'; // For styling buttons
import studentImage from '../assets/shivaram.png'; // Import the image

function StudentPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Left side: Image */}
      <div className="left-side">
        <img 
          src={studentImage} 
          alt="Student" 
          className="student-image" 
        />
      </div>

      {/* Right side: Content */}
      <div className="right-side">
        <h1 className="title">Student Dashboard</h1>
        <div className="student-buttons-container">
          <button onClick={() => navigate('/available-slots')} className="student-button">
            Book Slots
          </button>
          <button onClick={() => navigate('/learn-with-ai')} className="student-button">
            AI Learn
          </button>
          <button onClick={() => navigate('/subject')} className="student-button">
            Game Learn
          </button>
          <button onClick={() => navigate('/select')} className="student-button">
            Quizzes
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
