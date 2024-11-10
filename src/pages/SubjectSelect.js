import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/SubjectSelect.css'; // Import the custom CSS file

const SubjectSelect = () => {
  const navigate = useNavigate();

  const handleSelectSubject = (subject) => {
    navigate(`/quiz/${subject}`);
  };

  return (
    <div className="subject-select-container">
      <h2 className="subject-heading">Select a Subject</h2>
      <div className="subject-btn-container">
        <Button
          variant="primary"
          onClick={() => handleSelectSubject('DSA')}
          className="subject-btn"
        >
          DSA
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSelectSubject('DBMS')}
          className="subject-btn"
        >
          DBMS
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSelectSubject('Java')}
          className="subject-btn"
        >
          Java
        </Button>
      </div>
    </div>
  );
};

export default SubjectSelect;
