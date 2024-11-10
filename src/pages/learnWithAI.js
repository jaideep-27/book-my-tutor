import React, { useState } from "react";
import axios from "axios";
import buttonImage from "../assets/button.png"; // Import the button image
import '../styles/learnWithAI.css'

const LearnWithAI = () => {
  const [learningGoal, setLearningGoal] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to simulate loading and fetch data
  const getLearningSuggestions = async () => {
    setLoading(true);
    setError(null);
    setSuggestions(null); // Clear previous suggestions

    // Simulate loading state for 2 seconds
    setTimeout(async () => {
      try {
        const response = await axios.post("http://localhost:5000/generate-path", {
          goals: learningGoal,
        });

        if (response.data.paths) {
          setSuggestions(response.data.paths.split("\n"));
        } else {
          setError("No suggestions available. Please try again.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 1000); // Delay before API call to simulate loading
  };

  return (
    <div>
      <h1 className="title">Learn with AI</h1>

      <div className="main-content">
        <textarea
          rows="5"
          placeholder="What do you want to learn?"
          value={learningGoal}
          onChange={(e) => setLearningGoal(e.target.value)}
        ></textarea>

        <button
          onClick={getLearningSuggestions}
          style={{
            width: '200px', // Set button width
            height: '60px', // Set button height
            backgroundImage: `url(${buttonImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {loading && <span style={{ color: 'white' }}>Loading...</span>}
        </button>

        {loading && (
          <div id="loading">Loading your personalized learning path...</div>
        )}

        {error && <div id="error">{error}</div>}

        {suggestions && (
          <div id="suggestions">
            <h3>Suggested Learning Paths:</h3>
            <ul>
              {suggestions.map((path, index) => (
                <li key={index}>{path}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnWithAI;
