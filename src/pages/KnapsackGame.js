import React, { useState } from 'react';

function KnapsackGame() {
  const items = [
    { name: 'Item 1', weight: 3, value: 4 },
    { name: 'Item 2', weight: 2, value: 3 },
    { name: 'Item 3', weight: 4, value: 5 },
    { name: 'Item 4', weight: 5, value: 6 },
  ];
  const capacity = 60; // Increased capacity to 60
  const [selectedItems, setSelectedItems] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [hint, setHint] = useState('');
  const [badge, setBadge] = useState(null);
  const [possibleSolutions, setPossibleSolutions] = useState([]);

  // Handle item selection
  const handleItemClick = (item) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedItems);
    calculateMaxValue(updatedItems);
  };

  // Calculate the total weight and value
  const calculateMaxValue = (updatedItems) => {
    let totalWeight = updatedItems.reduce((sum, item) => sum + item.weight, 0);
    let totalValue = updatedItems.reduce((sum, item) => sum + item.value, 0);

    if (totalWeight <= capacity) {
      setMaxValue(totalValue);
      setHint('');
    } else {
      setMaxValue(0);
      setHint(`Total weight exceeds the capacity of ${capacity}. Try removing some items.`);
    }

    // Provide dynamic hints for the user
    if (totalWeight > capacity) {
      setHint(`You have selected items with total weight: ${totalWeight}. It exceeds the capacity.`);
    } else {
      setHint(`Current total value: ${totalValue}, Current total weight: ${totalWeight}`);
    }
  };

  // Check if the solution is valid
  const handleSubmit = () => {
    let totalWeight = selectedItems.reduce((sum, item) => sum + item.weight, 0);
    let totalValue = selectedItems.reduce((sum, item) => sum + item.value, 0);
    
    if (totalWeight <= capacity) {
      setBadge('🏆 Knapsack Solver Badge');
      setHint(`Congratulations! Total Value: ${totalValue}`);
    } else {
      setBadge(null);
      setHint('Solution is incorrect. Please ensure the weight limit is not exceeded.');
    }
  };

  // Reset the game
  const resetGame = () => {
    setSelectedItems([]);
    setMaxValue(0);
    setHint('');
    setBadge(null);
    setPossibleSolutions([]);
  };

  // Generate all possible solutions
  const getAllPossibleSolutions = () => {
    const allSolutions = [];
    const numItems = items.length;

    // Generate all subsets of items
    for (let i = 0; i < (1 << numItems); i++) {
      let subset = [];
      let totalWeight = 0;
      let totalValue = 0;

      for (let j = 0; j < numItems; j++) {
        if (i & (1 << j)) {
          subset.push(items[j]);
          totalWeight += items[j].weight;
          totalValue += items[j].value;
        }
      }

      if (totalWeight <= capacity) {
        allSolutions.push({ subset, totalWeight, totalValue });
      }
    }

    // Sort solutions by value in descending order
    allSolutions.sort((a, b) => b.totalValue - a.totalValue);
    setPossibleSolutions(allSolutions);
  };

  return (
    <div style={styles.container}>
    <h1 style={{ ...styles.title, top: '80px' }}>Knapsack Problem</h1>
      <p>Click on items to add them to the knapsack. Ensure the total weight does not exceed {capacity}.</p>
      
      {/* Item selection area */}
      <div style={styles.itemContainer}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.item,
              backgroundColor: selectedItems.includes(item) ? '#ffcc00' : '#fff',
            }}
            onClick={() => handleItemClick(item)}
          >
            {item.name} (Weight: {item.weight}, Value: {item.value})
          </div>
        ))}
      </div>

      {/* Max value display */}
      <div style={styles.maxValue}>
        <p>Max Value: {maxValue}</p>
      </div>

      {/* Hint and badge */}
      {hint && (
        <div style={styles.hint}>
          <p style={{ color: hint.includes('Congratulations') ? 'green' : 'red' }}>{hint}</p>
        </div>
      )}

      {/* Buttons - Reset, Submit, Show Solutions */}
      <div style={styles.buttonContainer}>
        <button onClick={resetGame} style={styles.button}>Reset</button>
        <button onClick={handleSubmit} style={styles.button}>Submit Solution</button>
        <button onClick={getAllPossibleSolutions} style={styles.button}>Show Possible Solutions</button>
      </div>

      {/* Display possible solutions */}
      {possibleSolutions.length > 0 && (
        <div style={styles.possibleSolutions}>
          <h3>Possible Solutions:</h3>
          <ul>
            {possibleSolutions.map((solution, index) => (
              <li key={index}>
                <strong>Items: </strong>
                {solution.subset.map(item => item.name).join(', ')} 
                <strong> | Total Value: </strong>{solution.totalValue} 
                <strong> | Total Weight: </strong>{solution.totalWeight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {badge && <div style={styles.badge}><p>{badge}</p></div>}
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
  },
  header: {
    color: '#4CAF50',
    fontSize: '2em',
  },
  itemContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 200px)',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '30px',
  },
  item: {
    width: '200px',
    padding: '10px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  maxValue: {
    marginTop: '20px',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  hint: {
    marginTop: '10px',
    fontSize: '1.1em',
    fontWeight: 'normal',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around', // Spread buttons evenly
    flexWrap: 'wrap', // Allow buttons to wrap to the next line if needed
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '1em',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    width: '200px', // Make buttons have a consistent width
  },
  badge: {
    marginTop: '20px',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'gold',
  },
  possibleSolutions: {
    marginTop: '30px',
    fontSize: '1.1em',
    textAlign: 'left',
    paddingLeft: '20px',
  },
};

export default KnapsackGame;
