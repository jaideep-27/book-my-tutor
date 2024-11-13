// HomePage.js
import React from 'react';
import { auth, db } from '../config/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import '../styles/home.css';
import googleLogo from '../assets/google.png';

function HomePage() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user is already in the users collection
      const userRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        // Create new user in Firestore
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          role: "student",  // Default role
          createdAt: serverTimestamp(),
        });
      }

      navigate("/role-selection"); // Redirect after sign-in
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="background-image">
      <button className="google-signin-button" onClick={handleGoogleSignIn}>
        <img src={googleLogo} alt="Google logo" className="google-logo" />
        Sign in with Google
      </button>
    </div>
  );
}

export default HomePage;
