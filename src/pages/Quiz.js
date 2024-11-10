import React, { useState } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Quiz.css'; // Import custom CSS file for styling

// List of quizzes for different subjects
const quizzes = {
  DSA: [
    { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], correctAnswer: "O(log n)" },
    { question: "Which of the following is not a type of Linked List?", options: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Binary Linked List"], correctAnswer: "Binary Linked List" },
    { question: "Which of the following is the best sorting algorithm in terms of worst-case time complexity?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Selection Sort"], correctAnswer: "Merge Sort" },
    { question: "What is the space complexity of Quick Sort?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correctAnswer: "O(log n)" },
    { question: "What type of tree is used to represent expressions in mathematics?", options: ["Binary Search Tree", "Expression Tree", "AVL Tree", "Red-Black Tree"], correctAnswer: "Expression Tree" },
    { question: "Which algorithm is used to find the shortest path in a weighted graph?", options: ["BFS", "DFS", "Dijkstra's Algorithm", "Prim's Algorithm"], correctAnswer: "Dijkstra's Algorithm" },
    { question: "What is the time complexity of accessing an element in an array?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correctAnswer: "O(1)" },
    { question: "Which of the following is not a stable sorting algorithm?", options: ["Merge Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"], correctAnswer: "Selection Sort" },
    { question: "Which of the following is an advantage of using a heap data structure?", options: ["Faster search", "Faster insert", "Faster delete", "Balanced structure"], correctAnswer: "Faster insert" },
    { question: "In a depth-first search, which data structure is used to keep track of nodes?", options: ["Queue", "Stack", "Array", "Linked List"], correctAnswer: "Stack" },
  ],
  DBMS: [
    { question: "What is the primary key in a relational database?", options: ["A unique identifier for records", "A foreign key", "A field used for indexing", "A field with no null values"], correctAnswer: "A unique identifier for records" },
    { question: "Which of the following is used to connect a database to an application?", options: ["API", "Driver", "Controller", "Server"], correctAnswer: "Driver" },
    { question: "What is the purpose of normalization in a database?", options: ["Reduce redundancy", "Increase redundancy", "Improve query performance", "Simplify schema design"], correctAnswer: "Reduce redundancy" },
    { question: "Which of the following is not a type of SQL join?", options: ["Inner Join", "Left Join", "Outer Join", "Merge Join"], correctAnswer: "Merge Join" },
    { question: "What does the acronym ACID stand for in database systems?", options: ["Atomicity, Consistency, Isolation, Durability", "Atomicity, Consistency, Integrity, Durability", "Automatic, Consistency, Isolation, Durability", "Atomic, Consistency, Isolation, Distribution"], correctAnswer: "Atomicity, Consistency, Isolation, Durability" },
    { question: "What is the main advantage of using indexes in a database?", options: ["Faster data retrieval", "Faster data insertion", "Reduced storage space", "Simplified data structure"], correctAnswer: "Faster data retrieval" },
    { question: "Which of the following is a type of integrity constraint in a relational database?", options: ["Primary Key", "Foreign Key", "Check Constraint", "All of the above"], correctAnswer: "All of the above" },
    { question: "Which SQL command is used to add new records to a table?", options: ["INSERT", "UPDATE", "ALTER", "SELECT"], correctAnswer: "INSERT" },
    { question: "In a relational database, what is a foreign key?", options: ["A key that uniquely identifies a record", "A key that links two tables", "A key that is used for indexing", "A key that prevents null values"], correctAnswer: "A key that links two tables" },
    { question: "What is a stored procedure in a database?", options: ["A query stored in the database for later execution", "A program that runs automatically on server startup", "A type of index", "A type of trigger"], correctAnswer: "A query stored in the database for later execution" },
  ],
  Java: [
    { question: "What is the default value of a boolean variable in Java?", options: ["true", "false", "null", "0"], correctAnswer: "false" },
    { question: "Which of the following is not a valid Java data type?", options: ["int", "float", "double", "integer"], correctAnswer: "integer" },
    { question: "What is the size of an int in Java?", options: ["8 bits", "16 bits", "32 bits", "64 bits"], correctAnswer: "32 bits" },
    { question: "Which of the following is used to read input from the user in Java?", options: ["Scanner", "BufferedReader", "InputStream", "Console"], correctAnswer: "Scanner" },
    { question: "What does the 'static' keyword mean in Java?", options: ["Can be used only in classes", "Belongs to the class rather than an instance", "Can be accessed without creating an object", "Cannot be overridden"], correctAnswer: "Belongs to the class rather than an instance" },
    { question: "Which of the following methods is used to start a thread in Java?", options: ["run()", "start()", "execute()", "init()"], correctAnswer: "start()" },
    { question: "What is the result of the expression 5 / 2 in Java?", options: ["2.5", "2", "5", "Error"], correctAnswer: "2" },
    { question: "Which of the following is the base class for all exceptions in Java?", options: ["Throwable", "Exception", "Error", "RuntimeException"], correctAnswer: "Throwable" },
    { question: "What is the purpose of the 'final' keyword in Java?", options: ["To prevent method overriding", "To prevent variable modification", "To prevent class inheritance", "All of the above"], correctAnswer: "All of the above" },
    { question: "What does the 'super' keyword do in Java?", options: ["Refers to the superclass constructor", "Refers to the current instance", "Refers to the child class", "None of the above"], correctAnswer: "Refers to the superclass constructor" },
    { question: "Which of the following is not a feature of Java?", options: ["Object-oriented", "Platform-independent", "Memory management", "Multiple inheritance"], correctAnswer: "Multiple inheritance" },
  ],
};

const Quiz = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const nextQuestion = (selectedAnswer) => {
    if (selectedAnswer === quizzes[subject][currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizzes[subject].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
      setTimeout(() => {
        navigate('/results', { state: { score, totalQuestions: quizzes[subject].length } });
      }, 500);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 flex-column text-center">
      {!isQuizCompleted ? (
        <div className="quiz-container">
          <h2 className="quiz-heading">{subject} Quiz</h2>
          <p className="quiz-question">{quizzes[subject][currentQuestionIndex].question}</p>
          <ListGroup className="quiz-options">
            {quizzes[subject][currentQuestionIndex].options.map((option, index) => (
              <ListGroup.Item
                key={index}
                as="button"
                className="quiz-option"
                onClick={() => nextQuestion(option)}
              >
                {option}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <div className="quiz-completed">
          <h4>Your Score: {score}</h4>
          <Button variant="primary" onClick={() => navigate('/')} className="mt-3">Start New Quiz</Button>
        </div>
      )}
    </Container>
  );
};

export default Quiz;
