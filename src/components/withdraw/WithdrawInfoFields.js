import React from "react";

export default function WithdrawInfoFields({ formData, onChange }) {
  return (
    <div>
      <label>
        🆔 Nurse ID:
        <input
          type="text"
          name="nurse_id"
          value={formData.nurse_id}
          onChange={onChange}
        />
      </label>

      <label>
        💸 Số tiền muốn rút:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          min={0}
          onChange={onChange}
        />
      </label>

      <label>
        📅 Thời điểm yêu cầu:
        <input
          type="datetime-local"
          name="requested_at"
          value={formData.requested_at}
          onChange={onChange}
        />
      </label>

      <label>
        📅 Thời điểm xử lý:
        <input
          type="datetime-local"
          name="processed_at"
          value={formData.processed_at || ""}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
