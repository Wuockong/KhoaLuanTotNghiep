import React from "react";
import FeedbackFormWrapper from "../components/feedback/FeedbackFormWrapper";

export default function FeedbackPage() {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1rem" }}>
      <h2>💬 Gửi phản hồi cho dịch vụ chăm sóc</h2>
      <FeedbackFormWrapper />
    </div>
  );
}
