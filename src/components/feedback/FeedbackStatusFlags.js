import React from "react";

export default function FeedbackStatusFlags({ formData, onChange }) {
  return (
    <div>
      <label>
        ✅ Đã xác minh:
        <input
          type="checkbox"
          name="is_verified"
          checked={formData.is_verified}
          onChange={(e) =>
            onChange({
              target: { name: "is_verified", value: e.target.checked },
            })
          }
        />
      </label>
      <label>
        🚩 Bị báo cáo:
        <input
          type="checkbox"
          name="report_flag"
          checked={formData.report_flag}
          onChange={(e) =>
            onChange({
              target: { name: "report_flag", value: e.target.checked },
            })
          }
        />
      </label>
      {formData.report_flag && (
        <label>
          🧾 Lý do báo cáo:
          <input
            type="text"
            name="report_reason"
            value={formData.report_reason || ""}
            onChange={onChange}
          />
        </label>
      )}
    </div>
  );
}
