import React, { useState, useEffect } from 'react';

function NQueen() {
  const boardSize = 8; // N is the size of the board (N x N)
  const [solutions, setSolutions] = useState([]);
  const [mode, setMode] = useState('manual'); // 'manual' or 'view'
  const [board, setBoard] = useState(generateEmptyBoard(boardSize));
  const [cellColors, setCellColors] = useState(generateEmptyBoard(boardSize));
  const [hint, setHint] = useState('');
  const [badge, setBadge] = useState(null);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);

  // Generate an empty board
  function generateEmptyBoard(size) {
    return Array(size).fill().map(() => Array(size).fill(null));
  }

  // Backtracking algorithm to generate all solutions
  function solveNQueens(size) {
    const allSolutions = [];
    const board = Array(size).fill().map(() => Array(size).fill(null));
    const cols = new Set(); // To track which columns are occupied
    const diag1 = new Set(); // To track main diagonals
    const diag2 = new Set(); // To track anti-diagonals

    // Backtracking function to place queens
    function placeQueens(row) {
      if (row === size) {
        allSolutions.push(board.map(r => [...r])); // Deep copy of the board
        return;
      }

      for (let col = 0; col < size; col++) {
        // Check if the current column or diagonals are under attack
        if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
          continue;
        }

        // Place the queen
        board[row][col] = 'Q';
        cols.add(col);
        diag1.add(row - col);
        diag2.add(row + col);

        // Recursively place queens in the next row
        placeQueens(row + 1);

        // Backtrack
        board[row][col] = null;
        cols.delete(col);
        diag1.delete(row - col);
        diag2.delete(row + col);
      }
    }

    placeQueens(0);
    return allSolutions;
  }

  // Define isValidPlacement function for user's manual solution
  function isValidPlacement(row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false; // Same column
      if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false; // Left diagonal
      if (col + (row - i) < boardSize && board[i][col + (row - i)] === 'Q') return false; // Right diagonal
    }
    return true;
  }

  // Generate solutions on mount
  useEffect(() => {
    const allSolutions = solveNQueens(boardSize);
    setSolutions(allSolutions);
  }, []);

  // Handle cell click in manual mode
  const handleBoardClick = (row, col) => {
    if (mode !== 'manual') return; // Only allow placing queens in manual mode

    const newBoard = [...board];
    const newCellColors = [...cellColors].map((r) => [...r]);

    if (newBoard[row][col] === 'Q') {
      // Remove queen
      newBoard[row][col] = null;
      newCellColors[row][col] = null;
    } else if (isValidPlacement(row, col)) {
      // Place queen if valid
      newBoard[row][col] = 'Q';
      newCellColors[row][col] = 'green';
    } else {
      // Invalid placement
      newCellColors[row][col] = 'red';
      setHint('Invalid move! Queens cannot be placed in the same row, column, or diagonal.');
    }

    setBoard(newBoard);
    setCellColors(newCellColors);
  };

  // Check solution in manual mode
  const handleSubmit = () => {
    const isValid = isUserSolutionValid();
    if (isValid) {
      setBadge('🏆 N-Queen Solver Badge');
      setHint('Congratulations! You solved the N-Queen problem.');
    } else {
      setHint('Solution is incorrect. Ensure all queens are placed safely.');
    }
  };

  // Validate the user's solution
  const isUserSolutionValid = () => {
    const queenPositions = [];
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (board[row][col] === 'Q') queenPositions.push([row, col]);
      }
    }
    return (
      queenPositions.length === boardSize &&
      queenPositions.every(([row, col]) => isValidPlacement(row, col))
    );
  };

  // Reset the board
  const resetBoard = () => {
    setBoard(generateEmptyBoard(boardSize));
    setCellColors(generateEmptyBoard(boardSize));
    setHint('');
    setBadge(null);
  };

  // Switch mode and reset board
  const switchMode = (newMode) => {
    setMode(newMode);
    setHint('');
    setBadge(null);
    resetBoard();
    if (newMode === 'view') setCurrentSolutionIndex(0); // Reset to first solution in view mode
  };

  // Navigate through solutions in view mode
  const showNextSolution = () => {
    setCurrentSolutionIndex((prevIndex) => (prevIndex + 1) % solutions.length);
  };

  const showPreviousSolution = () => {
    setCurrentSolutionIndex((prevIndex) => (prevIndex - 1 + solutions.length) % solutions.length);
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between', paddingTop: '60px' }}>
      <h1 style={{ top: '80px' }}>N-Queen Problem</h1>
      <p>Select "Manual" to solve on your own or "View Solutions" to explore all possible solutions.</p>

      {/* Button Layout for Mode Switching */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px', padding: '10px', position: 'relative' }}>
        <button onClick={() => switchMode('manual')} style={{ padding: '10px 20px', fontSize: '16px', width: '40%' }}>Manual Mode</button>
        <button onClick={() => switchMode('view')} style={{ padding: '10px 20px', fontSize: '16px', width: '40%' }}>View Solutions</button>
      </div>

      {/* Board */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${boardSize}, 50px)`,
          gridTemplateRows: `repeat(${boardSize}, 50px)`,
          gap: '2px',
          marginBottom: '20px',
          justifyContent: 'center',
        }}
      >
        {(mode === 'view' ? solutions[currentSolutionIndex] : board).map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleBoardClick(rowIndex, colIndex)}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor:
                  mode === 'manual' && cellColors[rowIndex][colIndex]
                    ? cellColors[rowIndex][colIndex]
                    : (rowIndex + colIndex) % 2 === 0
                    ? 'lightgray'
                    : 'darkgray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              {cell && <span style={{ fontSize: '24px', color: 'white' }}>Q</span>}
            </div>
          ))
        )}
      </div>

      {/* Hint and Badge */}
      <div>
        {badge && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#ffd700',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h2>{badge}</h2>
            <p>You've earned the N-Queen Solver badge!</p>
          </div>
        )}
        <p>{hint}</p>
      </div>

      {/* Navigation Buttons for View Mode */}
      {mode === 'view' && (
        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)' }}>
          <button onClick={showPreviousSolution} style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}>
            Previous
          </button>
          <button onClick={showNextSolution} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default NQueen;
