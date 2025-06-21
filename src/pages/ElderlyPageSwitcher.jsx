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
        {/* <span>
          {showRJFS ? "Tài khoản người cao tuổi" : "Chỉnh sửa bằng RJSF"}
        </span> */}
      </div>

      <div style={{ padding: "1rem" }}>
        {showRJFS ? <AccountElderly /> : <ElderlyRJFS />}
      </div>
    </div>
  );
};

export default ElderlyPageSwitcher;
