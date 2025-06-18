import React, { useEffect, useState } from "react";
import { getContracts, fillContract } from "../../services/contractService";

function TransactionPage() {
  const [contracts, setContracts] = useState([]);
  const [selectedContractId, setSelectedContractId] = useState("");
  const [formData, setFormData] = useState({
    serviceType: "",
    price: "",
    startDate: "",
    endDate: "",
  });

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

  const handleFillContract = async (e) => {
    e.preventDefault();
    if (!selectedContractId) {
      alert("Bạn chưa chọn hợp đồng!");
      return;
    }

    try {
      await fillContract(selectedContractId, formData);
      alert("✅ Đã cập nhật hợp đồng");
    } catch (err) {
      alert("❌ Không thể cập nhật hợp đồng: " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <h2>💳 Quản lý giao dịch</h2>

      {/* Danh sách hợp đồng để chọn */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Chọn hợp đồng:</label>
        <select
          value={selectedContractId}
          onChange={(e) => setSelectedContractId(e.target.value)}>
          <option value="">-- Chọn hợp đồng --</option>
          {contracts.map((contract) => (
            <option key={contract._id} value={contract._id}>
              {contract._id} - {contract.status}
            </option>
          ))}
        </select>
      </div>

      {/* Form điền thông tin hợp đồng */}
      <form onSubmit={handleFillContract} className="transaction-form-wrapper">
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Loại dịch vụ:</label>
          <input
            type="text"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Giá tiền:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Ngày bắt đầu:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Ngày kết thúc:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Cập nhật hợp đồng
        </button>
      </form>
    </div>
  );
}

export default TransactionPage;
