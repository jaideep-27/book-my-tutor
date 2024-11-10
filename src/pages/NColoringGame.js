import React, { useState, useEffect } from 'react';

function NColoringGame() {
  const [numNodes, setNumNodes] = useState(5); // Default to 5 nodes
  const [numColors, setNumColors] = useState(4); // Default to 4 colors
  const [colors, setColors] = useState(Array(5).fill(null)); // Initialize with 5 nodes
  const [hints, setHints] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // To track submission status
  const [graph, setGraph] = useState([]); // The graph structure

  useEffect(() => {
    setGraph(generateGraph(numNodes)); // Generate graph on node count change
    setColors(Array(numNodes).fill(null)); // Reset node colors
  }, [numNodes]);

  // Dynamically change the number of nodes
  const handleGraphChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumNodes(num);
  };

  // Dynamically change the number of colors
  const handleColorChange = (e) => {
    setNumColors(parseInt(e.target.value, 10));
  };

  // Function to generate a simple graph for the given number of nodes
  const generateGraph = (numNodes) => {
    const newGraph = [];
    for (let i = 0; i < numNodes; i++) {
      const neighbors = [];
      if (i > 0) neighbors.push(i - 1); // Connect to previous node
      if (i < numNodes - 1) neighbors.push(i + 1); // Connect to next node
      newGraph.push(neighbors);
    }
    return newGraph;
  };

  // Check if coloring is valid for the given node
  const isValidColoring = (node, color, colors) => {
    const neighbors = graph[node];
    for (let i = 0; i < neighbors.length; i++) {
      if (colors[neighbors[i]] === color) {
        return false;
      }
    }
    return true;
  };

  // Backtracking function to solve N-coloring problem
  const solveNColoring = (node, colors) => {
    if (node === colors.length) return true; // All nodes colored

    // Try all colors for the current node
    for (let color = 0; color < numColors; color++) {
      if (isValidColoring(node, color, colors)) {
        colors[node] = color;
        if (solveNColoring(node + 1, colors)) {
          return true;
        }
        colors[node] = null; // Backtrack
      }
    }
    return false; // No valid coloring found
  };

  // Handle clicking on a node to change its color
  const handleNodeColorChange = (node, color) => {
    const newColors = [...colors];
    newColors[node] = color;
    setColors(newColors);

    if (isValidColoring(node, color, newColors)) {
      setHints('');
    } else {
      setHints('Two adjacent nodes have the same color. Try changing one!');
    }
  };

  // Handle form submission and validate the coloring
  const handleSubmit = () => {
    const newColors = [...colors];
    if (solveNColoring(0, newColors)) {
      setColors(newColors);
      setIsSubmitted(true);
    } else {
      setHints('The coloring is invalid. Please correct it before submitting.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.title, top: '80px' }}>N-Coloring Problem</h1>
      <div style={styles.inputContainer}>
        <label>
          Number of Nodes:
          <input
            type="number"
            value={numNodes}
            onChange={handleGraphChange}
            min="2"
            style={styles.input}
          />
        </label>

        <label>
          Number of Colors:
          <input
            type="number"
            value={numColors}
            onChange={handleColorChange}
            min="2"
            style={styles.input}
          />
        </label>
      </div>

      <p>Click on a node to change its color.</p>
      <div style={styles.nodeContainer}>
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              ...styles.node,
              backgroundColor: color === null ? 'white' : `hsl(${color * 360 / numColors}, 100%, 50%)`,
            }}
            onClick={() => handleNodeColorChange(index, (color + 1) % numColors)}
          >
            Node {index}
          </div>
        ))}
      </div>

      <div style={styles.hints}>
        {hints && <p><strong>Hint: </strong>{hints}</p>}
      </div>

      <button
        style={styles.submitButton}
        onClick={handleSubmit}
        disabled={isSubmitted}
      >
        Submit Solution
      </button>

      {isSubmitted && <div style={styles.badge}>Solution Submitted! 🎉</div>}
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
  inputContainer: {
    marginBottom: '20px',
  },
  input: {
    margin: '10px',
    padding: '5px',
    fontSize: '1em',
  },
  nodeContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '30px',
  },
  node: {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: '50%',
    border: '2px solid #ccc',
  },
  hints: {
    marginTop: '20px',
    color: 'red',
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
  },
  badge: {
    marginTop: '20px',
    fontSize: '1.5em',
    color: '#4CAF50',
    fontWeight: 'bold',
  },
};

export default NColoringGame;
