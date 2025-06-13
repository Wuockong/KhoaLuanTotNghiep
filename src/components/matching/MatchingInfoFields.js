import React from "react";

export default function MatchingInfoFields({ formData, onChange }) {
  return (
    <>
      <label>
        🧓 Elderly ID:
        <input
          name="elderly_id"
          value={formData.elderly_id}
          onChange={onChange}
          required
        />
      </label>
      <label>
        👩‍⚕️ Nurse ID:
        <input
          name="nurse_id"
          value={formData.nurse_id}
          onChange={onChange}
          required
        />
      </label>
      <label>
        📦 Gói dịch vụ:
        <select
          name="service_level"
          value={formData.service_level}
          onChange={onChange}>
          <option value="basic">Cơ bản</option>
          <option value="standard">Tiêu chuẩn</option>
          <option value="premium">Cao cấp</option>
        </select>
      </label>
      <label>
        🔁 Đã match?
        <input
          type="checkbox"
          name="isMatched"
          checked={formData.isMatched}
          onChange={(e) =>
            onChange({ target: { name: "isMatched", value: e.target.checked } })
          }
        />
      </label>
    </>
  );
}
