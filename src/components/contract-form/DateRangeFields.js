// components/contract-form/DateRangeFields.js
import React from "react";

export default function DateRangeFields({
  effectiveDate,
  expiryDate,
  onChange,
}) {
  return (
    <>
      <label>
        🗓️ Ngày bắt đầu:
        <input
          type="date"
          name="effective_date"
          value={effectiveDate}
          onChange={onChange}
          required
        />
      </label>
      <label>
        📆 Ngày kết thúc (tuỳ chọn):
        <input
          type="date"
          name="expiry_date"
          value={expiryDate}
          onChange={onChange}
        />
      </label>
    </>
  );
}
