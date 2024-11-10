// src/pages/AvailableSlotsPage.js

import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

function AvailableSlotsPage() {
  const [availableSlots, setAvailableSlots] = useState([]);

  const fetchAvailableSlots = async () => {
    try {
      const slotsQuery = query(collection(db, "availability"), where("isBooked", "==", false));
      const querySnapshot = await getDocs(slotsQuery);
      const slots = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableSlots(slots);
    } catch (error) {
      console.error("Error fetching available slots: ", error);
    }
  };

  const bookSlot = async (slotId, instructorID) => {
    try {
      // Update the slot to mark it as booked
      await updateDoc(doc(db, "availability", slotId), { isBooked: true });
      fetchAvailableSlots(); // Refresh available slots
      alert("Booking successful!");
    } catch (error) {
      console.error("Error booking slot: ", error);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  return (
    <div>
      <h1 style={{ top: '80px' }}>Available Slots</h1>
      <ul>
        {availableSlots.map((slot) => (
          <li key={slot.id}>
            {slot.day} - {slot.startTime.toDate().toLocaleString()} to {slot.endTime.toDate().toLocaleString()}
            <button onClick={() => bookSlot(slot.id, slot.instructorID)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableSlotsPage;
