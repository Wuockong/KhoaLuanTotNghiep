// ThemeToggle.jsx
import React from "react";
import { Icon } from "@iconify/react";
import "../../assets/styles/base/themeToggle.css";

const ThemeToggle = ({ isChecked, onToggle }) => {
  return (
    <label>
      <input
        className="toggle-checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
      />
      <div className="toggle-slot">
        <div className="sun-icon-wrapper">
          <Icon icon="feather-sun" className="sun-icon" inline={false} />
        </div>
        <div className="toggle-button" />
        <div className="moon-icon-wrapper">
          <Icon icon="feather-moon" className="moon-icon" inline={false} />
        </div>
      </div>
    </label>
  );
};

export default ThemeToggle;
