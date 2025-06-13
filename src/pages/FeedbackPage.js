import React, { useState } from "react";
import "../assets/styles/base/buttons.css";
import "../assets/styles/base/common.css";
import { reportViolation, completeMatching } from "../services/matchingService";

function FeedbackPage({ matchId }) {
  const [feedback, setFeedback] = useState("");

  const handleReportViolation = async () => {
    try {
      await reportViolation(matchId, { feedback });
      alert("✅ Đã gửi báo cáo vi phạm");
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
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1rem" }}>
      <h2>💬 Gửi phản hồi cho dịch vụ chăm sóc</h2>
      <FeedbackFormWrapper />
    </div>
  );
}
