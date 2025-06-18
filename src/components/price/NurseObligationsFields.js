import React from "react";

export default function NurseObligationsFields({
  formData,
  onChange,
  updateArrayField,
}) {
  const obligations = formData.nurse_obligations;

  return (
    <div>
      <h4>👩‍⚕️ Nghĩa vụ Nurse</h4>

      <label>
        🕒 Giờ cam kết/tuần:
        <input
          type="number"
          name="nurse_obligations.committed_hours_per_week"
          value={obligations.committed_hours_per_week}
          onChange={onChange}
        />
      </label>

      <label>
        ⚡ Thời gian phản hồi:
        <select
          name="nurse_obligations.response_time_commitment"
          value={obligations.response_time_commitment}
          onChange={onChange}>
          <option value="24h">Trong 24h</option>
          <option value="12h">Trong 12h</option>
          <option value="4h">Trong 4h</option>
        </select>
      </label>

      <label>
        📋 Báo cáo/ngày:
        <input
          type="number"
          name="nurse_obligations.daily_reports"
          value={obligations.daily_reports}
          onChange={onChange}
        />
      </label>

      <label>📜 Chứng chỉ yêu cầu:</label>
      {obligations.certifications_required.map((cert, idx) => (
        <div key={idx}>
          <input
            type="text"
            value={cert}
            onChange={(e) =>
              updateArrayField("certifications_required", idx, e.target.value)
            }
          />
          <button
            type="button"
            onClick={() =>
              updateArrayField("certifications_required", idx, null)
            }>
            ❌
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          updateArrayField(
            "certifications_required",
            obligations.certifications_required.length,
            ""
          )
        }>
        ➕ Thêm chứng chỉ
      </button>

      <label>
        📚 Tần suất đào tạo:
        <input
          type="text"
          name="nurse_obligations.training_frequency"
          value={obligations.training_frequency || ""}
          onChange={onChange}
        />
      </label>

      <label>
        🔍 Kiểm tra chất lượng:
        <input
          type="text"
          name="nurse_obligations.quality_supervision_frequency"
          value={obligations.quality_supervision_frequency || ""}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
