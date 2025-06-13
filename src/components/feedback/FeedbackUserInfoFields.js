import React from "react";

export default function FeedbackUserInfoFields({ formData, onChange }) {
  return (
    <div>
      <label>
        👴 ID người gửi (elderly):
        <input
          type="text"
          name="from_user_id"
          value={formData.from_user_id}
          onChange={onChange}
          required
        />
      </label>
      <label>
        👩‍⚕️ ID người nhận (nurse):
        <input
          type="text"
          name="to_user_id"
          value={formData.to_user_id}
          onChange={onChange}
          required
        />
      </label>
      <label>
        🛎️ ID dịch vụ:
        <input
          type="text"
          name="service_id"
          value={formData.service_id}
          onChange={onChange}
          required
        />
      </label>
    </div>
  );
}
