// src/pages/RoleSelectionPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import backgroundImage from '../assets/role-selection.png';
import instructorImage from '../assets/instructor.png';
import studentImage from '../assets/student.png';

function RoleSelectionPage() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const selectRole = async (role) => {
    try {
      await updateDoc(doc(db, "users", user.uid), { role });
      if (role === "instructor") {
        navigate("/instructor");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.error("Error setting role: ", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '120%',
          gap: '0px', // Set gap to 0
        }}
      >
        <img
          src={instructorImage}
          alt="Instructor"
          onClick={() => selectRole("instructor")}
          style={{
            cursor: 'pointer',
            width: '170px',
            transition: 'transform 0.3s ease', // Smooth transition
            marginRight: '-5px', // Slight overlap to reduce space further
          }}
          className="hover-scale"
        />
        <img
          src={studentImage}
          alt="Student"
          onClick={() => selectRole("student")}
          style={{
            cursor: 'pointer',
            width: '150px',
            transition: 'transform 0.3s ease',
          }}
          className="hover-scale"
        />
      </div>

      <style>
        {`
          .hover-scale:hover {
            transform: scale(1.25); // Scale slightly on hover
          }
        `}
      </style>
    </div>
  );
}

export default RoleSelectionPage;
