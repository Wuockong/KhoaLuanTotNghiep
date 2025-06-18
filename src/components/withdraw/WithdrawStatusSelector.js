import React from "react";

export default function WithdrawStatusSelector({ status, onChange }) {
  return (
    <div>
      <label>
        📌 Trạng thái:
        <select name="status" value={status} onChange={onChange}>
          <option value="pending">⏳ Chờ xử lý</option>
          <option value="approved">✅ Đã duyệt</option>
          <option value="completed">🎉 Hoàn tất</option>
          <option value="rejected">❌ Bị từ chối</option>
        </select>
      </label>
    </div>
  );
}
