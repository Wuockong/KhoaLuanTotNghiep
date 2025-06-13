import React, { useEffect, useState } from "react";
import "../assets/styles/pages/testform-nurses.css";
// import QuestionCard from "../components/QuestionCard";
import { submitTest } from "../services/testService";

function TestFormNurses() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  // const [loading, setLoading] = useState(false); // thêm loading
  const [loading] = useState(false); // thêm loading
  useEffect(() => {
    // API lấy câu hỏi hiện chưa có → để tạm trống:
    /*
    const loadQuestions = async () => {
      setLoading(true);
      const res = await getTestQuestions();
      setQuestions(res.data);
      setLoading(false);
    };
    loadQuestions();
    */
    setQuestions([]); // tạm thời set rỗng để không lỗi
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // Thêm handleChange cho đúng:
  const handleChange = (questionIndex, answer) => {
    handleAnswerSelect(questionIndex, answer);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // thêm để không reload form
    try {
      // const token = localStorage.getItem("token");
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
                  onChange={(e) => handleChange(q.id, e.target.value)}
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
      {score !== null && <p>Điểm của bạn: {score}</p>}
    </div>
  );
}

export default TestFormNurses;
