// pages/ContractFormPage.js
import React from "react";
import ContractFormWrapper from "../components/contract-form/ContractFormWrapper";

export default function ContractFormPage() {
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "1rem" }}>
      <h2>📝 Tạo Hợp Đồng Chăm Sóc</h2>
      <ContractFormWrapper />
    </div>
  );
}
