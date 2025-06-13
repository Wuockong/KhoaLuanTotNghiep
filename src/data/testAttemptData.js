// src/data/testAttemptData.js

export const testAttempts = [
  {
    _id: "1",
    attempt_id: "A001",
    timestamp: "2025-06-13T10:30:00Z",
    questions: [
      {
        question: "What is the capital of France?",
        difficulty: "easy",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correct_answer: "Paris",
      },
      {
        question: "What is 2 + 2?",
        difficulty: "easy",
        options: ["3", "4", "5", "6"],
        correct_answer: "4",
      },
    ],
  },
  {
    _id: "2",
    attempt_id: "A002",
    timestamp: "2025-06-14T09:15:00Z",
    questions: [
      {
        question: "Which planet is known as the Red Planet?",
        difficulty: "medium",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correct_answer: "Mars",
      },
    ],
  },
];
