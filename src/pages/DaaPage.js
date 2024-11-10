import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ncoloringImage from '../assets/ncolouring.png';
import knapsackImage from '../assets/knapsack.png';
import nqueenImage from '../assets/nqueen.png';
import '../styles/DaaPage.css';

function DaaPage() {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleGameSelect = (game) => {
    if (!game) {
      setIsError(true);
      alert('Please select a game');
      return;
    }

    setIsError(false);
    navigate(`/${game}`);
  };

  return (
    <div className="daa-page container text-center">
      <h1 className="title my-4">Select a DAA Game</h1>

      <div className="button-container d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">
        <button
          onClick={() => handleGameSelect('nqueen')}
          className="game-button btn btn-success d-flex flex-column align-items-center"
        >
          <img src={nqueenImage} alt="N-Queen Icon" className="button-image" />
          N-Queen Problem
        </button>

        <button
          onClick={() => handleGameSelect('knapsack-game')}
          className="game-button btn btn-success d-flex flex-column align-items-center"
        >
          <img src={knapsackImage} alt="Knapsack Icon" className="button-image" />
          Knapsack Problem
        </button>

        <button
          onClick={() => handleGameSelect('ncoloring-game')}
          className="game-button btn btn-success d-flex flex-column align-items-center"
        >
          <img src={ncoloringImage} alt="N-Coloring Icon" className="button-image" />
          N-Coloring Problem
        </button>
      </div>

      {isError && <p className="error-message text-danger mt-3">Please select a game to proceed.</p>}
    </div>
  );
}

export default DaaPage;
