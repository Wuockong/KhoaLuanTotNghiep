import React from "react";

export default function BookingTimeFields({ bookingTime, setBookingTime }) {
  const handleTimeChange = (index, field, value) => {
    const updated = [...bookingTime];
    updated[index][field] = value;
    setBookingTime(updated);
  };

  const addTimeSlot = () => {
    setBookingTime([...bookingTime, { start_time: "", end_time: "" }]);
  };

  const removeTimeSlot = (index) => {
    const updated = [...bookingTime];
    updated.splice(index, 1);
    setBookingTime(updated);
  };

  return (
    <div>
      <h4>📅 Khung giờ booking:</h4>
      {bookingTime.map((slot, idx) => (
        <div key={idx}>
          <label>
            Start:
            <input
              type="datetime-local"
              value={slot.start_time}
              onChange={(e) =>
                handleTimeChange(idx, "start_time", e.target.value)
              }
              required
            />
          </label>
          <label>
            End:
            <input
              type="datetime-local"
              value={slot.end_time}
              onChange={(e) =>
                handleTimeChange(idx, "end_time", e.target.value)
              }
              required
            />
          </label>
          <button type="button" onClick={() => removeTimeSlot(idx)}>
            🗑️
          </button>
        </div>
      ))}
      <button type="button" onClick={addTimeSlot}>
        ➕ Thêm khung giờ
      </button>
    </div>
  );
}
