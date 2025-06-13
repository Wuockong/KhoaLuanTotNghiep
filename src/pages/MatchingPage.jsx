import React from "react";
import MatchingFormWrapper from "../components/matching/MatchingFormWrapper";

export default function MatchingPage() {
  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: "1rem" }}>
      <h2>🔗 Tạo Matching giữa Elderly và Nurse</h2>
      <MatchingFormWrapper />
    </div>
  );
}
