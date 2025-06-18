// import React from "react";
// import ContractFormWrapper from "../components/contract-form/ContractFormWrapper";

// export default function ContractFormPage() {
//   return (
//     <div style={{ maxWidth: 600, margin: "auto", padding: "1rem" }}>
//       <h2>📝 Tạo Hợp Đồng Chăm Sóc</h2>
//       <ContractFormWrapper />
//     </div>
//   );
// }
// ElderlyPageSwitcher.jsx
import React, { useState } from "react";
import ThemeToggle from "../components/ui/ThemeToggle";
import ContractFormWrapper from "../components/contract-form/ContractFormWrapper";
import ContractForm from "../components/contract-form/ContractForm";

const ElderlyPageSwitcher = () => {
  const [showRJFS, setShowRJFS] = useState(false);

  const handleToggle = () => {
    setShowRJFS((prev) => !prev);
  };

  return (
    <div>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}>
        <span>👵 Chuyển chế độ:</span>
        <ThemeToggle isChecked={showRJFS} onToggle={handleToggle} />
        <span>
          {showRJFS ? "Chỉnh sửa bằng RJSF" : "Tài khoản người cao tuổi"}
        </span>
      </div>

      <div style={{ padding: "1rem" }}>
        {showRJFS ? <ContractFormWrapper /> : <ContractForm />}
      </div>
    </div>
  );
};

export default ElderlyPageSwitcher;
