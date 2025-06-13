import React from "react";

export default function TransactionMetaFields({ formData, onChange }) {
  return (
    <div>
      <label>
        📅 Ngày tạo:
        <input
          type="datetime-local"
          name="created_at"
          value={formData.created_at}
          onChange={onChange}
          required
        />
      </label>
      <label>
        ♻️ Ngày cập nhật:
        <input
          type="datetime-local"
          name="updated_at"
          value={formData.updated_at}
          onChange={onChange}
        />
      </label>
      <label>
        📝 Ghi chú:
        <textarea name="note" value={formData.note || ""} onChange={onChange} />
      </label>
    </div>
  );
}
