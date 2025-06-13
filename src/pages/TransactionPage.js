import React from "react";
import TransactionFormWrapper from "../components/transaction/TransactionFormWrapper";

export default function TransactionPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <h2>💳 Quản lý giao dịch</h2>
      <TransactionFormWrapper />
    </div>
  );
}
