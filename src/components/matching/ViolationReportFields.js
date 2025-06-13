import React from "react";

export default function ViolationReportFields({ violation, onChange }) {
  return (
    <fieldset>
      <legend>🚨 Báo cáo vi phạm (nếu có)</legend>
      <label>
        Người báo cáo:
        <input
          name="reported_by"
          value={violation?.reported_by || ""}
          onChange={onChange}
        />
      </label>
      <label>
        Lý do:
        <input
          name="reason"
          value={violation?.reason || ""}
          onChange={onChange}
        />
      </label>
      <label>
        Thời gian:
        <input
          type="datetime-local"
          name="timestamp"
          value={violation?.timestamp || ""}
          onChange={onChange}
        />
      </label>
    </fieldset>
  );
}
