import React from 'react';
import support from '../assets/support.png'; // Import the image

function SupportUs() {
  // Internal styles
  const supportUsStyle = {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    color: '#333',
  };

  const titleStyle = {
    top: '80px',
    fontSize: '2.5em',
    marginBottom: '20px',
  };

  const contentStyle = {
    width: '70vw',
    fontSize: '1.2em',
    lineHeight: '1.5',
  };

  const imageContainerStyle = {
    width: '300px',
    height: '300px',
    margin: '0 auto 20px',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div style={supportUsStyle}>
      <div style={imageContainerStyle}>
        <img src={support} alt="Support" style={imageStyle} />
      </div>
      <h1 style={titleStyle}>Support Us</h1>
      <p style={contentStyle}>
        We rely on the support and generosity of our community to continue
        offering valuable resources and services. Your contributions help us
        expand our reach, improve our services, and make a positive impact.
        Consider supporting us to help sustain our mission and bring our vision
        to life.
      </p>
    </div>
  );
}

export default SupportUs;
