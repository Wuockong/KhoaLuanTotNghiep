import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FeedbackUserInfoFields from "./FeedbackUserInfoFields";
import FeedbackContentFields from "./FeedbackContentFields";
import FeedbackStatusFlags from "./FeedbackStatusFlags";
import FeedbackMetaFields from "./FeedbackMetaFields";

export default function FeedbackFormWrapper() {
  const [formData, setFormData] = useState({
    _id: uuidv4(),
    from_user_id: "",
    to_user_id: "",
    service_id: "",
    rating: 5,
    title: "",
    comment: "",
    createdAt: new Date().toISOString().slice(0, 16),
    is_verified: false,
    report_flag: false,
    report_reason: "",
    service_level: "basic",
    ai_sentiment_analysis: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = e.target.type === "checkbox" ? e.target.checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📤 Feedback:", formData);
    alert("🎉 Feedback đã được gửi!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FeedbackUserInfoFields formData={formData} onChange={handleChange} />
      <FeedbackContentFields formData={formData} onChange={handleChange} />
      <FeedbackStatusFlags formData={formData} onChange={handleChange} />
      <FeedbackMetaFields formData={formData} onChange={handleChange} />
      <button type="submit">📨 Gửi Feedback</button>
    </form>
  );
}
