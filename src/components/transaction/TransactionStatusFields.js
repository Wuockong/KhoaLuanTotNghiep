import React from "react";

export default function TransactionStatusFields({ formData, onChange }) {
  return (
    <div>
      <label>
        📦 Trạng thái:
        <select name="status" value={formData.status} onChange={onChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>
      <label>
        💳 Phương thức:
        <select
          name="payment_method"
          value={formData.payment_method}
          onChange={onChange}>
          <option value="bank_transfer">Chuyển khoản ngân hàng</option>
        </select>
      </label>
      <label>
        🗓️ Feedback received at:
        <input
          type="datetime-local"
          name="feedback_received_at"
          value={formData.feedback_received_at || ""}
          onChange={onChange}
        />
      </label>
      <label>
        📮 Feedback đã gửi:
        <input
          type="checkbox"
          name="is_feedback_provided"
          checked={formData.is_feedback_provided}
          onChange={(e) =>
            onChange({
              target: { name: "is_feedback_provided", value: e.target.checked },
            })
          }
        />
      </label>
    </div>
  );
}
