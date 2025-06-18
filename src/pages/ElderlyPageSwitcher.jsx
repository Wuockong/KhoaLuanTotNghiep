// ElderlyPageSwitcher.jsx
import React, { useState } from "react";
import ThemeToggle from "../components/ui/ThemeToggle";
import AccountElderly from "./Elderly/AccountElderly";
import ElderlyRJFS from "./Elderly/ElderlyRJFS";

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
        {showRJFS ? <ElderlyRJFS /> : <AccountElderly />}
      </div>
    </div>
  );
};

export default ElderlyPageSwitcher;
