// src/pages/SelectSubjectPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SelectSubjectPage() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const navigate = useNavigate();

  const handleSubjectSelect = () => {
    if (!selectedSubject) {
      alert('Please select a subject');
      return;
    }

    // Redirect to the respective page based on the selected subject
    if (selectedSubject === 'daa') {
      navigate('/daa');  // Redirect to DAA page if selected
    } else if (selectedSubject === 'html&css') {
      window.location.href = 'https://ahndohun.github.io/emmet-game/';
    } else {
      alert('Other subjects are not yet implemented.');
    }
  };

  // Inline styles
  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
    },
    selectContainer: {
      margin: '20px 0',
    },
    subjectDropdown: {
      fontSize: '1.2em',
      padding: '10px',
      margin: '20px 0',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#ffcc00', // Yellow background
      color: '#333', // Dark text
      width: '250px',
      cursor: 'pointer',
    },
    option: {
      backgroundColor: '#ffcc00', // Yellow background for options
      color: '#333', // Dark text color
    },
    startButton: {
      fontSize: '1.5em',
      padding: '12px 20px',
      backgroundColor: '#ffcc00', // Yellow background
      color: '#333', // Dark text
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    startButtonHover: {
      backgroundColor: '#e6b800', // Darker yellow on hover
    },
  };

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div style={styles.container}>
      <h1 style={{ top: '80px' }}>Select a Subject</h1>
      <div style={styles.selectContainer}>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={styles.subjectDropdown}
        >
          <option value="">-- Select Subject --</option>
          <option value="daa">DAA (Data Structures and Algorithms)</option>
          <option value="ds">DS (Data Structures)</option>
          <option value="python">Python</option>
          <option value="html&css">HTML & CSS</option>
        </select>
      </div>
      <button
        onClick={handleSubjectSelect}
        style={{
          ...styles.startButton,
          ...(isButtonHovered ? styles.startButtonHover : {}),
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        Start Game
      </button>
    </div>
  );
}

export default SelectSubjectPage;
