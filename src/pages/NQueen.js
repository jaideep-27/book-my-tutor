import React, { useState, useEffect } from 'react';

function NQueen() {
  const boardSize = 8;
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

    function isValid(board, row, col) {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') return false;
        if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;
        if (col + (row - i) < size && board[i][col + (row - i)] === 'Q') return false;
      }
      return true;
    }

    function placeQueens(row) {
      if (row === size) {
        allSolutions.push(board.map(r => [...r])); // Deep copy of the board
        return;
      }
      for (let col = 0; col < size; col++) {
        if (isValid(board, row, col)) {
          board[row][col] = 'Q';
          placeQueens(row + 1);
          board[row][col] = null; // Backtrack
        }
      }
    }

    placeQueens(0);
    return allSolutions;
  }

  // Check if the current placement is valid
  function isValidPlacement(row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
      if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;
      if (col + (row - i) < boardSize && board[i][col + (row - i)] === 'Q') return false;
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
    if (mode !== 'manual') return;

    const newBoard = board.map(r => [...r]);
    const newCellColors = cellColors.map(r => [...r]);

    if (newBoard[row][col] === 'Q') {
      newBoard[row][col] = null;
      newCellColors[row][col] = null;
    } else if (isValidPlacement(row, col)) {
      for (let i = 0; i < boardSize; i++) {
        newBoard[row][i] = null;
        newCellColors[row][i] = null;
      }
      newBoard[row][col] = 'Q';
      newCellColors[row][col] = 'green';
      setHint('');
    } else {
      newCellColors[row][col] = 'red';
      setHint('Invalid move! Queens cannot be placed in the same row, column, or diagonal.');
    }

    setBoard(newBoard);
    setCellColors(newCellColors);
  };

  // Check if the user's solution is valid
  const isUserSolutionValid = () => {
    const queenPositions = [];
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (board[row][col] === 'Q') queenPositions.push([row, col]);
      }
    }
    return queenPositions.length === boardSize && queenPositions.every(([row, col]) => isValidPlacement(row, col));
  };

  // Submit solution
  const handleSubmit = () => {
    const isValid = isUserSolutionValid();
    if (isValid) {
      setBadge('🏆 N-Queen Solver Badge');
      setHint('Congratulations! You solved the N-Queen problem.');
    } else {
      setHint('Solution is incorrect. Ensure all queens are placed safely.');
    }
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
    if (newMode === 'view') setCurrentSolutionIndex(0);
  };

  // Navigate through solutions in view mode
  const showNextSolution = () => {
    setCurrentSolutionIndex((prevIndex) => (prevIndex + 1) % solutions.length);
  };

  const showPreviousSolution = () => {
    setCurrentSolutionIndex((prevIndex) => (prevIndex - 1 + solutions.length) % solutions.length);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ top: '80px' }}>N-Queen Problem</h1>
      <div>
        <button onClick={() => switchMode('manual')}>Manual Mode</button>
        <button onClick={() => switchMode('view')}>View Solutions</button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${boardSize}, 50px)`,
        gap: '2px',
        margin: '20px auto',
        justifyContent: 'center',
      }}>
        {(mode === 'view' ? solutions[currentSolutionIndex] : board).map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleBoardClick(rowIndex, colIndex)}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: mode === 'manual' && cellColors[rowIndex][colIndex]
                  ? cellColors[rowIndex][colIndex]
                  : (rowIndex + colIndex) % 2 === 0 ? 'lightgray' : 'darkgray',
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

      {badge && <div>{badge}</div>}
      <p>{hint}</p>

      <div>
        <button onClick={resetBoard}>Reset Board</button>
        <button onClick={handleSubmit}>Submit Solution</button>
        {mode === 'view' && (
          <>
            <button onClick={showPreviousSolution}>Previous</button>
            <button onClick={showNextSolution}>Next</button>
          </>
        )}
      </div>
    </div>
  );
}

export default NQueen;
