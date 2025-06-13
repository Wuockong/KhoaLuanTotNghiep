import React from "react";

export default function PriceRangeFields({ formData, onChange }) {
  return (
    <div>
      <label>
        💵 Giá tối thiểu (VND/giờ):
        <input
          type="number"
          name="price_range.min"
          value={formData.price_range.min}
          onChange={onChange}
          min={0}
        />
      </label>
      <label>
        💰 Giá tối đa (VND/giờ):
        <input
          type="number"
          name="price_range.max"
          value={formData.price_range.max}
          onChange={onChange}
          min={0}
        />
      </label>
    </div>
  );
}
