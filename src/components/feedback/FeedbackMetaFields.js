import React from "react";

export default function FeedbackMetaFields({ formData, onChange }) {
  return (
    <div>
      <label>
        📦 Mức dịch vụ:
        <select
          name="service_level"
          value={formData.service_level}
          onChange={onChange}
          required>
          <option value="basic">Cơ bản</option>
          <option value="standard">Tiêu chuẩn</option>
          <option value="premium">Cao cấp</option>
        </select>
      </label>
      <label>
        🧠 Phân tích cảm xúc AI:
        <select
          name="ai_sentiment_analysis"
          value={formData.ai_sentiment_analysis}
          onChange={onChange}>
          <option value="pending">Đang xử lý</option>
          <option value="positive">Tích cực</option>
          <option value="neutral">Trung lập</option>
          <option value="negative">Tiêu cực</option>
        </select>
      </label>
      <label>
        📅 Ngày tạo:
        <input
          type="datetime-local"
          name="createdAt"
          value={formData.createdAt}
          onChange={onChange}
          required
        />
      </label>
    </div>
  );
}
