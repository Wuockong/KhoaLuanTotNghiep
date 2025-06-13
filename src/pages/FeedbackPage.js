import React, { useState } from "react";
import "../assets/styles/base/buttons.css";
import "../assets/styles/base/common.css";
import { reportViolation, completeMatching } from "../services/matchingService";

function FeedbackPage({ matchId }) {
  const [feedback, setFeedback] = useState("");

  const handleReportViolation = async (e) => {
    e.preventDefault();
    try {
      await reportViolation(matchId, { feedback });
      alert("✅ Đã gửi báo cáo vi phạm");
      setFeedback(""); // reset form
    } catch (err) {
      alert("❌ Không thể gửi báo cáo: " + err.message);
    }
  };

  const handleCompleteMatching = async () => {
    try {
      await completeMatching(matchId);
      alert("✅ Đã đánh dấu hoàn thành matching");
    } catch (err) {
      alert("❌ Không thể đánh dấu hoàn thành: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>📝 Feedback về quá trình chăm sóc</h2>

      {/* Form gửi feedback */}
      <form onSubmit={handleReportViolation} className="feedback-form-wrapper">
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Nhập nội dung feedback:</label>
          <textarea
            rows="5"
            style={{ width: "100%" }}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Gửi báo cáo vi phạm
        </button>
      </form>

      {/* Nút đánh dấu hoàn thành */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleCompleteMatching} className="submit-btn">
          Đánh dấu hoàn thành matching
        </button>
      </div>
    </div>
  );
}

export default FeedbackPage;
