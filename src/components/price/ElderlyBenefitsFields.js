import React from "react";

export default function ElderlyBenefitsFields({ benefits, setBenefits }) {
  const handleAdd = () => setBenefits([...benefits, ""]);
  const handleChange = (index, value) => {
    const updated = [...benefits];
    updated[index] = value;
    setBenefits(updated);
  };
  const handleRemove = (index) => {
    const updated = benefits.filter((_, i) => i !== index);
    setBenefits(updated);
  };

  return (
    <div>
      <h4>👴 Quyền lợi Elderly</h4>
      {benefits.map((benefit, i) => (
        <div key={i}>
          <input
            type="text"
            value={benefit}
            onChange={(e) => handleChange(i, e.target.value)}
          />
          <button type="button" onClick={() => handleRemove(i)}>
            ❌
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAdd}>
        ➕ Thêm quyền lợi
      </button>
    </div>
  );
}
