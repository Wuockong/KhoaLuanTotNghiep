import React from "react";

export default function TransactionAmountsFields({ formData, onChange }) {
  return (
    <div>
      <label>
        💰 Tổng tiền:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={onChange}
          min={0}
          required
        />
      </label>
      <label>
        💱 Loại tiền:
        <select name="currency" value={formData.currency} onChange={onChange}>
          <option value="VND">VND</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="PlatformToken">PlatformToken</option>
        </select>
      </label>
      <label>
        🏷️ Dịch vụ:
        <select
          name="service_type"
          value={formData.service_type}
          onChange={onChange}>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </label>
      <label>
        🧾 Phí nền tảng:
        <input
          type="number"
          name="platform_fee"
          value={formData.platform_fee}
          onChange={onChange}
          min={0}
        />
      </label>
      <label>
        👩‍⚕️ Nurse nhận:
        <input
          type="number"
          name="nurse_receive_amount"
          value={formData.nurse_receive_amount}
          onChange={onChange}
          min={0}
        />
      </label>
      <label>
        💸 Giải ngân từng phần:
        <input
          type="number"
          name="partial_release_amount"
          value={formData.partial_release_amount}
          onChange={onChange}
          min={0}
        />
      </label>
    </div>
  );
}
