import React, { useState } from "react";
import api from "../../services/axiosClient";
import "../../assets/styles/pages/survey.css";

function Survey() {
  const [questions, setQuestions] = useState([
    { question: "Bạn cảm thấy sức khỏe tổng thể của mình thế nào?", answer: "" },
    { question: "Bạn có thường xuyên bị đau đầu không?", answer: "" },
    { question: "Bạn có gặp khó khăn khi đi lại không?", answer: "" },
    { question: "Bạn ngủ có ngon giấc không?", answer: "" }
  ]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleChange = (index, value) => {
    const updated = [...questions];
    updated[index].answer = value;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.post("/survey/submit", { questions });
      setMessage("✅ Đã gửi khảo sát thành công!");
      console.log("📨 Response:", res.data);
    } catch (err) {
      setMessage("❌ Gửi khảo sát thất bại.");
      console.error("🚫 Lỗi gửi khảo sát:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await api.get("/survey/history");
      setHistory(res.data);
      setShowHistory(true);
    } catch (err) {
      console.error("⚠️ Không thể tải lịch sử khảo sát:", err);
    }
  };

  return (
    <div className="page-container">
      <h1>📄 Khảo sát sức khỏe</h1>

      <form className="survey-form" onSubmit={(e) => e.preventDefault()}>
        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <label>{q.question}</label>
            <input
              type="text"
              value={q.answer}
              onChange={(e) => handleChange(index, e.target.value)}
              required
            />
          </div>
        ))}

        <button type="button" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "⏳ Đang gửi..." : "📤 Gửi khảo sát"}
        </button>
        <button type="button" onClick={fetchHistory} style={{ marginLeft: '1rem' }}>
          📚 Xem lịch sử khảo sát
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      {showHistory && (
        <div className="history-section">
          <h2>📋 Lịch sử khảo sát</h2>
          {history.length === 0 ? (
            <p>Không có khảo sát nào.</p>
          ) : (
            history.map((entry, idx) => (
              <div key={entry._id || idx} className="survey-entry">
                <p><strong>🕒 Ngày:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
                <ul>
                  {entry.questions.map((q, i) => (
                    <li key={i}><strong>{q.question}</strong>: {q.answer}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Survey;
