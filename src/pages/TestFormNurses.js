import React, { useEffect, useState } from "react";
import "../assets/styles/pages/testform-nurses.css";
import QuestionCard from "../components/QuestionCard";
import { submitTest } from "../services/testService";

function TestFormNurses() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    // API lấy câu hỏi hiện chưa có → để tạm trống:
    /*
    const loadQuestions = async () => {
      const res = await getTestQuestions();
      setQuestions(res.data);
    };
    loadQuestions();
    */
    setQuestions([]); // tạm thời set rỗng để không lỗi
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        questions: Object.keys(selectedAnswers).map((questionId) => ({
          question_id: questionId,
          answer: selectedAnswers[questionId],
        })),
      };

      const res = await submitTest(payload);
      alert("✅ Nộp bài thành công");
      setScore(res.data.score);
    } catch (err) {
      alert("❌ Không thể nộp bài: " + err.message);
    }
  };

  if (loading) return <div className="test-loading">Đang tải câu hỏi...</div>;

  return (
    <div className="test-form-fullscreen">
      <h2>📝 Bài kiểm tra hôm nay</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <p>
              <strong>
                {index + 1}. {q.question}
              </strong>
            </p>
            {q.options.map((opt, i) => (
              <label key={i} className="option-item">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={opt}
                  onChange={(e) => handleChange(index, e.target.value)}
                  required
                />{" "}
                {opt}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Nộp bài
        </button>
      </form>
    </div>
  );
}

export default TestFormNurses;
