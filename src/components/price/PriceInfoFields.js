import React from "react";

export default function PriceInfoFields({ formData, onChange }) {
  return (
    <div>
      <label>
        🏷️ Mức dịch vụ:
        <select
          name="service_level"
          value={formData.service_level}
          onChange={onChange}>
          <option value="basic">Basic (Cơ bản)</option>
          <option value="standard">Standard (Tiêu chuẩn)</option>
          <option value="premium">Premium (Cao cấp)</option>
        </select>
      </label>
    </div>
  );
}
