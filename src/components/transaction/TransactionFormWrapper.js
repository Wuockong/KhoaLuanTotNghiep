import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TransactionInfoFields from "./TransactionInfoFields";
import TransactionAmountsFields from "./TransactionAmountsFields";
import TransactionStatusFields from "./TransactionStatusFields";
import TransactionMetaFields from "./TransactionMetaFields";

export default function TransactionFormWrapper() {
  const [formData, setFormData] = useState({
    _id: "", // có thể không cần nhập nếu Mongo tự sinh
    transaction_id: uuidv4(),
    elderly_id: "",
    nurse_id: "",
    amount: 0,
    currency: "VND",
    service_type: "basic",
    platform_fee: 0,
    nurse_receive_amount: 0,
    partial_release_amount: 0,
    status: "pending",
    payment_method: "bank_transfer",
    created_at: new Date().toISOString().slice(0, 16),
    updated_at: new Date().toISOString().slice(0, 16),
    feedback_received_at: "",
    is_feedback_provided: false,
    note: "",
    withdraw_request_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = e.target.type === "checkbox" ? e.target.checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📤 Submit Transaction:", formData);
    alert("💸 Giao dịch đã được ghi nhận!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TransactionInfoFields formData={formData} onChange={handleChange} />
      <TransactionAmountsFields formData={formData} onChange={handleChange} />
      <TransactionStatusFields formData={formData} onChange={handleChange} />
      <TransactionMetaFields formData={formData} onChange={handleChange} />
      <button type="submit">💾 Ghi giao dịch</button>
    </form>
  );
}
