import React from "react";

export default function ContractStatusFields({ contractStatus, onChange }) {
  return (
    <fieldset>
      <legend>📜 Trạng thái hợp đồng</legend>
      <label>
        🧾 Chữ ký Elderly:
        <input
          name="elderly_signature"
          value={contractStatus.elderly_signature || ""}
          onChange={onChange}
        />
      </label>
      <label>
        🧾 Chữ ký Nurse:
        <input
          name="nurse_signature"
          value={contractStatus.nurse_signature || ""}
          onChange={onChange}
        />
      </label>
      <label>
        🔐 Contract Hash:
        <input
          name="contract_hash"
          value={contractStatus.contract_hash || ""}
          onChange={onChange}
        />
      </label>
      <label>
        ✅ Đã ký:
        <input
          type="checkbox"
          name="is_signed"
          checked={contractStatus.is_signed}
          onChange={(e) =>
            onChange({ target: { name: "is_signed", value: e.target.checked } })
          }
        />
      </label>
    </fieldset>
  );
}
