import React, { useState } from "react";
import WithdrawInfoFields from "./WithdrawInfoFields";
import BankAccountFields from "./BankAccountFields";
import WithdrawStatusSelector from "./WithdrawStatusSelector";
import { v4 as uuidv4 } from "uuid";

export default function WithdrawFormWrapper() {
  const [formData, setFormData] = useState({
    _id: "",
    withdraw_request_id: uuidv4(),
    nurse_id: "",
    amount: 0,
    status: "pending",
    bank_account_info: {
      account_number: "",
      bank_name: "",
      crypto_address: "",
    },
    requested_at: new Date().toISOString().slice(0, 16),
    processed_at: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("bank_account_info.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        bank_account_info: {
          ...prev.bank_account_info,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📝 Submitted Withdraw Request:", formData);
    alert("✅ Gửi yêu cầu rút tiền thành công!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <WithdrawInfoFields formData={formData} onChange={handleChange} />
      <BankAccountFields
        bankInfo={formData.bank_account_info}
        onChange={handleChange}
      />
      <WithdrawStatusSelector
        status={formData.status}
        onChange={handleChange}
      />
      <button type="submit">💾 Gửi yêu cầu</button>
    </form>
  );
}
