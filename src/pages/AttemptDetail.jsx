import React from "react";
import { useParams } from "react-router-dom";
import { testAttempts } from "../data/testAttemptData";
import { showTestResultPopup } from "../utils/showTestResultPopup";

function AttemptDetail() {
  const { id } = useParams();

  const attempt = testAttempts.find((item) => item._id === id);

  if (!attempt) {
    return <div>❌ Không tìm thấy bài kiểm tra.</div>;
  }

  const handleSubmitResult = () => {
    // Giả lập kết quả - bạn có thể xử lý thực tế ở đây nếu có tính toán
    const total_questions = attempt.questions.length;
    const correct_answers = attempt.questions.filter(
      (q) => q.correct_answer === q.correct_answer // giả lập đúng hết
    ).length;
    const score = Math.round((correct_answers / total_questions) * 100);

    const testResult = {
      attempt_id: attempt.attempt_id,
      total_questions,
      correct_answers,
      score,
      current_score: score,
      average_score: 70, // giả lập điểm trung bình
    };

    showTestResultPopup(testResult);
  };

  return (
    <div className="attempt-detail">
      <h2>📋 Chi tiết bài kiểm tra</h2>
      <p>
        <strong>Mã bài làm:</strong> {attempt.attempt_id}
      </p>
      <p>
        <strong>Thời gian:</strong>{" "}
        {new Date(attempt.timestamp).toLocaleString()}
      </p>
      <hr />
      <ol>
        {attempt.questions.map((q, index) => (
          <li key={index}>
            <p>
              <strong>{q.question}</strong>
            </p>
            <ul>
              {q.options.map((opt, i) => (
                <li
                  key={i}
                  style={{
                    color: opt === q.correct_answer ? "green" : "black",
                  }}>
                  {opt} {opt === q.correct_answer ? "✅" : ""}
                </li>
              ))}
            </ul>
            <p>
              <em>Độ khó:</em> {q.difficulty}
            </p>
          </li>
        ))}
      </ol>

      <button onClick={handleSubmitResult} style={{ marginTop: "20px" }}>
        📝 Nộp bài kiểm tra
      </button>
    </div>
  );
}

export default AttemptDetail;
