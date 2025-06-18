import React from "react";
import PriceFormWrapper from "../components/price/PriceFormWrapper";

export default function PricePage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <h2>💰 Quản lý Bảng Giá Dịch Vụ</h2>
      <PriceFormWrapper />
    </div>
  );
}
