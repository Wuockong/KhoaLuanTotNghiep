import React from "react";

export default function FeedbackContentFields({ formData, onChange }) {
  return (
    <div>
      <label>
        ⭐ Đánh giá (1-5):
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={onChange}
          min={1}
          max={5}
          required
        />
      </label>
      <label>
        📝 Tiêu đề (tuỳ chọn):
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={onChange}
        />
      </label>
      <label>
        💬 Nhận xét:
        <textarea
          name="comment"
          value={formData.comment}
          onChange={onChange}
          required
        />
      </label>
    </div>
  );
}
