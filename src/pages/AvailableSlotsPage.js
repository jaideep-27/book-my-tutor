import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { addDoc, collection, doc, onSnapshot, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import '../styles/AvailableSlotsPage.css';

function AvailableSlotsPage() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const slotsRef = collection(db, "availability");
    const unsubscribe = onSnapshot(slotsRef, (snapshot) => {
      const slotsData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        startTime: doc.data().startTime?.toDate(),
        endTime: doc.data().endTime?.toDate()
      }));
      setAvailableSlots(slotsData.filter(slot => !slot.isBooked));
      setBookedSlots(slotsData.filter(slot => slot.studentID === auth.currentUser?.uid));
    });
    return () => unsubscribe();
  }, []);

  const bookSlot = async (slotID) => {
    const slotRef = doc(db, "availability", slotID);
    const slotDoc = await getDoc(slotRef);
    if (slotDoc.exists() && !slotDoc.data().isBooked) {
      try {
        await updateDoc(slotRef, {
          isBooked: true,
          studentID: auth.currentUser?.uid,
        });
        await addDoc(collection(db, "bookings"), {
          studentID: auth.currentUser?.uid,
          instructorID: slotDoc.data().instructorID,
          timeSlot: slotID,
          status: "confirmed",
          createdAt: serverTimestamp(),
        });
        alert("Slot booked successfully!");
      } catch (error) {
        console.error("Error booking slot:", error);
      }
    } else {
      alert("This slot has already been booked!");
    }
  };

  return (
    <div className="available-slots-page">
      <h1 style={{ top: '80px' }}>Available Slots</h1>
      <ul>
        {availableSlots.map(slot => (
          <li key={slot.id}>
            {slot.day} | {slot.startTime ? slot.startTime.toLocaleString() : "Invalid Date"} - {slot.endTime ? slot.endTime.toLocaleString() : "Invalid Date"}
            <button onClick={() => bookSlot(slot.id)}>Book</button>
          </li>
        ))}
      </ul>
      <h2>Your Booked Slots</h2>
      <ul>
        {bookedSlots.map(slot => (
          <li key={slot.id}>
            {slot.day} | {slot.startTime ? slot.startTime.toLocaleString() : "Invalid Date"} - {slot.endTime ? slot.endTime.toLocaleString() : "Invalid Date"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableSlotsPage;
