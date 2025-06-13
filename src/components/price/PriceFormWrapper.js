import React, { useState } from "react";
import PriceInfoFields from "./PriceInfoFields";
import PriceRangeFields from "./PriceRangeFields";
import ElderlyBenefitsFields from "./ElderlyBenefitsFields";
import NurseObligationsFields from "./NurseObligationsFields";

export default function PriceFormWrapper() {
  const [formData, setFormData] = useState({
    _id: "",
    service_level: "basic",
    price_range: { min: 0, max: 0 },
    elderly_benefits: [],
    nurse_obligations: {
      committed_hours_per_week: 0,
      response_time_commitment: "24h",
      daily_reports: 0,
      certifications_required: [],
      training_frequency: "",
      quality_supervision_frequency: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("nurse_obligations.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        nurse_obligations: { ...prev.nurse_obligations, [key]: value },
      }));
    } else if (name.startsWith("price_range.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        price_range: { ...prev.price_range, [key]: Number(value) },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateArrayField = (field, index, value) => {
    const arr = [...formData.nurse_obligations[field]];
    if (value === null) arr.splice(index, 1);
    else arr[index] = value;
    setFormData((prev) => ({
      ...prev,
      nurse_obligations: { ...prev.nurse_obligations, [field]: arr },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📝 Submitted Price Data:", formData);
    alert("✅ Ghi dữ liệu giá thành công!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <PriceInfoFields formData={formData} onChange={handleChange} />
      <PriceRangeFields formData={formData} onChange={handleChange} />
      <ElderlyBenefitsFields
        benefits={formData.elderly_benefits}
        setBenefits={(b) => setFormData({ ...formData, elderly_benefits: b })}
      />
      <NurseObligationsFields
        formData={formData}
        onChange={handleChange}
        updateArrayField={updateArrayField}
      />
      <button type="submit">💾 Lưu bảng giá</button>
    </form>
  );
}
