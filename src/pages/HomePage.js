// HomePage.js
import React from 'react';
import { auth, db } from '../config/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import '../styles/home.css';
import googleLogo from '../assets/google.png';

function HomePage() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save the user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        createdAt: serverTimestamp(),
      });

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
