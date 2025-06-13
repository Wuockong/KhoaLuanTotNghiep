// components/contract-form/ServiceOptions.js
import React from "react";

export default function ServiceOptions({ value, onChange }) {
  return (
    <label>
      💼 Gói dịch vụ:
      <select name="service_level" value={value} onChange={onChange}>
        <option value="basic">Cơ bản</option>
        <option value="standard">Tiêu chuẩn</option>
        <option value="premium">Cao cấp</option>
      </select>
    </label>
  );
}
