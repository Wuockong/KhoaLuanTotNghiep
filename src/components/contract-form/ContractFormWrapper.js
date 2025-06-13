// components/contract-form/ContractFormWrapper.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ContractField from "./ContractField";
import ServiceOptions from "./ServiceOptions";
import DateRangeFields from "./DateRangeFields";

export default function ContractFormWrapper() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matching_id: "",
    elderly_id: "",
    nurse_id: "",
    effective_date: "",
    expiry_date: "",
    service_level: "basic",
    price_per_hour: 50000,
    total_hours_booked: 10,
    terms: ["Y tá đến đúng giờ", "Tôn trọng người cao tuổi"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalCost = formData.total_hours_booked * formData.price_per_hour;
    const deposit = totalCost * 0.5;
    const remaining = totalCost - deposit;
    const nurseShare = 0.8;
    const platformShare = 0.2;

    const contract = {
      _id: uuidv4(),
      matching_id: formData.matching_id,
      elderly_id: formData.elderly_id,
      nurse_id: formData.nurse_id,
      contract_hash: "FAKE_HASH_123456",
      signed_at: new Date().toISOString(),
      status: "pending",
      signed_by_elderly: null,
      signed_by_nurse: null,
      elderly_signature: null,
      nurse_signature: null,
      effective_date: formData.effective_date,
      expiry_date: formData.expiry_date || null,
      created_by: "system",
      last_modified_at: new Date().toISOString(),
      terms: formData.terms,
      history_logs: [],
      payment_details: {
        service_level: formData.service_level,
        price_per_hour: Number(formData.price_per_hour),
        total_hours_booked: Number(formData.total_hours_booked),
        deposit_amount: deposit,
        remaining_payment: remaining,
        nurse_share_percentage: nurseShare * 100,
        platform_share_percentage: platformShare * 100,
        nurse_total_earnings: totalCost * nurseShare,
        platform_total_earnings: totalCost * platformShare,
      },
    };

    console.log("📜 Hợp đồng được tạo:", contract);
    alert("✅ Hợp đồng đã được tạo!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <ContractField
        label="👴 Mã người cao tuổi:"
        name="elderly_id"
        value={formData.elderly_id}
        onChange={handleChange}
        required
      />
      <ContractField
        label="👩‍⚕️ Mã y tá:"
        name="nurse_id"
        value={formData.nurse_id}
        onChange={handleChange}
        required
      />
      <ContractField
        label="🤝 Mã matching:"
        name="matching_id"
        value={formData.matching_id}
        onChange={handleChange}
        required
      />
      <DateRangeFields
        effectiveDate={formData.effective_date}
        expiryDate={formData.expiry_date}
        onChange={handleChange}
      />
      <ServiceOptions value={formData.service_level} onChange={handleChange} />
      <ContractField
        label="💰 Giá mỗi giờ (VNĐ):"
        name="price_per_hour"
        type="number"
        value={formData.price_per_hour}
        onChange={handleChange}
        required
      />
      <ContractField
        label="⏱️ Số giờ booking:"
        name="total_hours_booked"
        type="number"
        value={formData.total_hours_booked}
        onChange={handleChange}
        required
      />
      <button type="submit">📩 Tạo hợp đồng</button>
    </form>
  );
}
