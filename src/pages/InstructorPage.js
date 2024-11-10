// src/pages/InstructorPage.js
import React, { useState } from 'react';
import { db, auth } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import '../styles/InstructorPage.css';
import teacherImage from '../assets/teacher.png'; // Import the teacher image

function InstructorPage() {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Function to add the availability slot
  const addSlot = async () => {
    try {
      await addDoc(collection(db, "availability"), {
        instructorID: auth.currentUser.uid,
        day,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        isBooked: false,
      });
      alert("Slot added successfully!");
    } catch (error) {
      console.error("Error adding slot: ", error);
    }
  };

  return (
    <div className="instructor-page">
      <div className="image-container">
        <img src={teacherImage} alt="Teacher" className="teacher-image" />
      </div>
      <div className="content-container">
        <h1 className="page-title" style={{ top: '80px' }}>Instructor Dashboard</h1>
        <div className="availability-form">
          <h2>Set Availability</h2>
          <input
            type="text"
            placeholder="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="form-input"
          />
          <input
            type="datetime-local"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="form-input"
          />
          <input
            type="datetime-local"
            placeholder="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="form-input"
          />
          <button onClick={addSlot} className="submit-btn">Add Slot</button>
        </div>
      </div>
    </div>
  );
}

export default InstructorPage;
