import React from "react";
import WithdrawFormWrapper from "../components/withdraw/WithdrawFormWrapper";

export default function WithdrawPage() {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1rem" }}>
      <h2>🏧 Yêu cầu rút tiền của Nurse</h2>
      <WithdrawFormWrapper />
    </div>
  );
}
