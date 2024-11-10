import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../styles/Results.css'; // Import the custom CSS file

const Results = () => {
  const location = useLocation();
  const { score, totalQuestions } = location.state;
  const percentage = (score / totalQuestions) * 100;

  let grade = 'F';
  let badge = 'No Badge ';
  let medalEmoji = '🥺'; //

  if (percentage === 100) {
    grade = 'A';
    badge = 'Gold';
    medalEmoji = '🏅'; // Gold medal emoji
  } else if (percentage >= 75) {
    grade = 'B';
    badge = 'Silver';
    medalEmoji = '🥈'; // Silver medal emoji
  } else if (percentage >= 50) {
    grade = 'C';
    badge = 'Bronze';
    medalEmoji = '🥉'; // Bronze medal emoji
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 flex-column text-center">
      <h2 className="result-heading">Quiz Results</h2>
      <h4>Your Score: <span className="highlight">{score}/{totalQuestions}</span></h4>
      <h4 className="highlight">Grade: {grade}</h4>
      
      {badge !== 'No Badge' && (
        <div className="badge-container">
          <div className="medal-emoji">{medalEmoji}</div>
          <h4 className="badge-text">Badge: {badge}</h4>
        </div>
      )}

      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={() => window.location.href = "/"} className="mt-3 start-new-btn">Start New Quiz</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Results;
