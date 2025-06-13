import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MatchingInfoFields from "./MatchingInfoFields";
import BookingTimeFields from "./BookingTimeFields";
import ContractStatusFields from "./ContractStatusFields";
import ViolationReportFields from "./ViolationReportFields";

export default function MatchingFormWrapper() {
  const [formData, setFormData] = useState({
    _id: uuidv4(),
    nurse_id: "",
    elderly_id: "",
    service_level: "basic",
    booking_time: [],
    isMatched: false,
    matchedAt: new Date().toISOString(),
    resetAt: new Date().toISOString(),
    contract_status: {
      elderly_signature: null,
      nurse_signature: null,
      contract_hash: null,
      is_signed: false,
    },
    violation_report: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContractChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contract_status: { ...prev.contract_status, [name]: value },
    }));
  };

  const handleViolationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      violation_report: { ...prev.violation_report, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Matching record:", formData);
    alert("🎉 Matching record đã được tạo!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <MatchingInfoFields formData={formData} onChange={handleChange} />
      <BookingTimeFields
        bookingTime={formData.booking_time}
        setBookingTime={(val) =>
          setFormData((prev) => ({ ...prev, booking_time: val }))
        }
      />
      <ContractStatusFields
        contractStatus={formData.contract_status}
        onChange={handleContractChange}
      />
      <ViolationReportFields
        violation={formData.violation_report}
        onChange={handleViolationChange}
      />
      <button type="submit">💾 Lưu Matching</button>
    </form>
  );
}
