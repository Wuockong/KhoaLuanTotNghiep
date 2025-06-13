import React from "react";

export default function BankAccountFields({ bankInfo, onChange }) {
  return (
    <div>
      <h4>🏦 Thông tin ngân hàng / Ví</h4>

      <label>
        Số tài khoản:
        <input
          type="text"
          name="bank_account_info.account_number"
          value={bankInfo.account_number}
          onChange={onChange}
        />
      </label>

      <label>
        Tên ngân hàng:
        <input
          type="text"
          name="bank_account_info.bank_name"
          value={bankInfo.bank_name}
          onChange={onChange}
        />
      </label>

      <label>
        Địa chỉ ví crypto (nếu có):
        <input
          type="text"
          name="bank_account_info.crypto_address"
          value={bankInfo.crypto_address || ""}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
