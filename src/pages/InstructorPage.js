// src/pages/InstructorPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the navigation hook
import { db, auth } from '../config/firebase';
import { addDoc, collection, doc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';

function InstructorPage() {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  // Check if user is signed in, and redirect if not
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/'); // Redirect to login if no user is signed in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch existing slots for the logged-in instructor only
  useEffect(() => {
    if (!auth.currentUser) return;
    const slotsRef = collection(db, "availability");
    const unsubscribe = onSnapshot(slotsRef, (snapshot) => {
      const slotsData = snapshot.docs
        .map(doc => ({ 
          ...doc.data(), 
          id: doc.id, 
          startTime: doc.data().startTime?.toDate(),
          endTime: doc.data().endTime?.toDate()
        }))
        .filter(slot => slot.instructorID === auth.currentUser.uid);
      setSlots(slotsData);
    });
    return () => unsubscribe();
  }, []);

  // Add availability slot
  const addSlot = async () => {
    if (!auth.currentUser) return;
    try {
      await addDoc(collection(db, "availability"), {
        instructorID: auth.currentUser.uid,
        day,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        isBooked: false,
      });
      setMessage("Slot added successfully!");
      setDay("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Error adding slot: ", error);
      setMessage("Failed to add slot. Please try again.");
    }
  };

  // Update slot function
  const updateSlot = async (slotID, newDay, newStartTime, newEndTime) => {
    try {
      const slotRef = doc(db, "availability", slotID);
      await updateDoc(slotRef, {
        day: newDay,
        startTime: new Date(newStartTime),
        endTime: new Date(newEndTime),
      });
      setMessage("Slot updated successfully!");
    } catch (error) {
      console.error("Error updating slot:", error);
      setMessage("Failed to update slot. Please try again.");
    }
  };

  // Delete slot
  const deleteSlot = async (slotID) => {
    try {
      await deleteDoc(doc(db, "availability", slotID));
      setMessage("Slot deleted successfully!");
    } catch (error) {
      console.error("Error deleting slot: ", error);
      setMessage("Failed to delete slot. Please try again.");
    }
  };

  return (
    <div className="instructor-page-container">
      <h1 className="instructor-page-header" style={{ top: '80px' }}>Instructor Dashboard</h1>

      {/* Slot addition form */}
      <div className="instructor-availability-form">
        <label className="instructor-label">Day (e.g., Monday)</label>
        <input
          type="text"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="instructor-input"
        />
        
        <label className="instructor-label">Start Time</label>
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="instructor-input"
        />

        <label className="instructor-label">End Time</label>
        <input
          type="datetime-local"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="instructor-input"
        />
        
        <button onClick={addSlot} className="instructor-add-button">Add</button>
      </div>

      {/* Display message */}
      {message && <p className="instructor-message">{message}</p>}

      {/* Display available slots */}
      <h2 className="instructor-sub-header">Your Available Slots</h2>
      <ul className="instructor-slot-list">
        {slots.map(slot => (
          <li key={slot.id} className="instructor-slot-item">
            {slot.day} | {slot.startTime ? slot.startTime.toLocaleString() : "Invalid Date"} - {slot.endTime ? slot.endTime.toLocaleString() : "Invalid Date"}
            <button onClick={() => deleteSlot(slot.id)} className="instructor-delete-button">Delete</button>
            <button onClick={() => updateSlot(slot.id, slot.day, slot.startTime, slot.endTime)} className="instructor-update-button">Update</button>
          </li>
        ))}
      </ul>

      {/* Internal styling */}
      <style jsx="true">{`
        .instructor-page-container {
          max-height: 100vh;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #f8f9fa;
        }
        .instructor-page-header {
          margin-bottom: 20px;
        }
        .instructor-availability-form {
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .instructor-label {
          font-weight: bold;
        }
        .instructor-input {
          padding: 8px;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #ced4da;
        }
        .instructor-add-button {
          padding: 10px;
          font-size: 16px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .instructor-message {
          color: green;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .instructor-sub-header {
          margin-top: 20px;
          margin-bottom: 10px;
        }
        .instructor-slot-list {
          width: 100%;
          max-width: 400px;
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .instructor-slot-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #e9ecef;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .instructor-delete-button {
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 5px 10px;
          cursor: pointer;
        }
        .instructor-update-button {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 5px 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default InstructorPage;
