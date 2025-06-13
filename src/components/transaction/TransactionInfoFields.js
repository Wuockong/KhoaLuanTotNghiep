import React from "react";

export default function TransactionInfoFields({ formData, onChange }) {
  return (
    <div>
      <label>
        🧾 Transaction ID:
        <input
          type="text"
          name="transaction_id"
          value={formData.transaction_id}
          onChange={onChange}
          required
        />
      </label>
      <label>
        👴 Elderly ID:
        <input
          type="text"
          name="elderly_id"
          value={formData.elderly_id}
          onChange={onChange}
          required
        />
      </label>
      <label>
        👩‍⚕️ Nurse ID:
        <input
          type="text"
          name="nurse_id"
          value={formData.nurse_id}
          onChange={onChange}
          required
        />
      </label>
      <label>
        🧾 Rút tiền (withdraw_request_id):
        <input
          type="text"
          name="withdraw_request_id"
          value={formData.withdraw_request_id || ""}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
