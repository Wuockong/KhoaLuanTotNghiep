import React from "react";

const QuestionCard = ({ questionData, index }) => {
  const { question, difficulty, options, correct_answer } = questionData;

  return (
    <div className="border rounded-xl p-4 mb-4 shadow-sm">
      <h2 className="font-semibold text-lg mb-2">
        Câu {index + 1}: {question}
      </h2>
      <p className="text-sm text-gray-500 mb-2">Mức độ: {difficulty}</p>
      <ul className="list-disc pl-5 mb-2">
        {options.map((opt, i) => (
          <li
            key={i}
            className={`${
              opt === correct_answer ? "text-green-600 font-bold" : ""
            }`}>
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
