import React, { useState } from "react";

function ServiceLogForm() {
  const [formData, setFormData] = useState({
    nurse_id: "",
    elderly_id: "",
    start_time: "",
    end_time: "",
    location: "",
    tasks_performed: [""],
    vital_signs: {
      blood_pressure_systolic: "",
      blood_pressure_diastolic: "",
      pulse: "",
      respiratory_rate: "",
      temperature: "",
      oxygen_saturation: "",
      weight: "",
      height: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.vital_signs) {
      setFormData((prev) => ({
        ...prev,
        vital_signs: {
          ...prev.vital_signs,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...formData.tasks_performed];
    updatedTasks[index] = value;
    setFormData((prev) => ({
      ...prev,
      tasks_performed: updatedTasks,
    }));
  };

  const addTaskField = () => {
    setFormData((prev) => ({
      ...prev,
      tasks_performed: [...prev.tasks_performed, ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    console.log("📤 Submitted Service Log:", payload);
    alert("✅ Log chăm sóc đã được ghi nhận!");
  };

  return (
    <div className="service-log-form" style={{ maxWidth: 700, margin: "auto" }}>
      <h2>📝 Ghi nhận buổi chăm sóc</h2>
      <form onSubmit={handleSubmit}>
        <label>
          👩‍⚕️ Mã y tá:
          <input
            name="nurse_id"
            value={formData.nurse_id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          👴 Mã người cao tuổi:
          <input
            name="elderly_id"
            value={formData.elderly_id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          ⏰ Bắt đầu:
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          🕓 Kết thúc:
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          📍 Địa điểm:
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <fieldset>
          <legend>🛠️ Công việc đã thực hiện</legend>
          {formData.tasks_performed.map((task, index) => (
            <input
              key={index}
              value={task}
              onChange={(e) => handleTaskChange(index, e.target.value)}
              placeholder={`Công việc ${index + 1}`}
              required
            />
          ))}
          <button type="button" onClick={addTaskField}>
            ➕ Thêm công việc
          </button>
        </fieldset>

        <fieldset>
          <legend>🩺 Dấu hiệu sinh tồn</legend>
          <label>
            Huyết áp tâm thu:
            <input
              type="number"
              name="blood_pressure_systolic"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Huyết áp tâm trương:
            <input
              type="number"
              name="blood_pressure_diastolic"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Nhịp tim:
            <input
              type="number"
              name="pulse"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Nhịp thở:
            <input
              type="number"
              name="respiratory_rate"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Nhiệt độ:
            <input
              type="number"
              step="0.1"
              name="temperature"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            SpO2 (%):
            <input
              type="number"
              name="oxygen_saturation"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Cân nặng (kg):
            <input type="number" name="weight" onChange={handleChange} />
          </label>
          <label>
            Chiều cao (cm):
            <input type="number" name="height" onChange={handleChange} />
          </label>
        </fieldset>

        <button type="submit">📩 Gửi Log chăm sóc</button>
      </form>
    </div>
  );
}

export default ServiceLogForm;
