import React, { useEffect, useState } from "react";
import { getContracts, fillContract } from "../services/contractService";

function TransactionPage() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const res = await getContracts();
      setContracts(res.data);
    } catch (err) {
      alert("❌ Không thể tải hợp đồng: " + err.message);
    }
  };

  const handleFillContract = async (contractId, formData) => {
    try {
      await fillContract(contractId, formData);
      alert("✅ Đã cập nhật hợp đồng");
    } catch (err) {
      alert("❌ Không thể cập nhật hợp đồng: " + err.message);
    }
  };
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <h2>💳 Quản lý giao dịch</h2>
      <TransactionFormWrapper />
    </div>
  );
}
