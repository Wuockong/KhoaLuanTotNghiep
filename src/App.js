import { Routes, Route } from "react-router-dom";

import EmergencyAlertForm from "./components/EmergencyAlertForm";

function App() {
  return (
    <Routes>
      <Route path="/alert" element={<EmergencyAlertForm />} />
    </Routes>
  );
}

export default App;
