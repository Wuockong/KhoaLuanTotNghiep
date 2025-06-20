import React, { useState, useEffect } from "react";
import api from "../../services/axiosClient";
import "../../assets/styles/pages/survey.css";

function Feedback() {
  const [form, setForm] = useState({
    to_user_id_nurse: "",
    matching_id: "",
    rating: 5,
    title: "",
    comment: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await api.post("/feedbacks", form);
      setMessage("✅ Gửi phản hồi thành công!");
      fetchFeedbacks();
    } catch (err) {
      setMessage("❌ Gửi phản hồi thất bại.");
      console.error("🚫 Lỗi gửi phản hồi:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("/feedbacks/user?page=1&limit=10");
      setFeedbacks(res.data.feedbacks);
    } catch (err) {
      console.error("⚠️ Không thể tải lịch sử phản hồi:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="page-container">
      <h1>📤 Gửi phản hồi dịch vụ</h1>

      <div className="survey-form">
        <input
          type="text"
          name="to_user_id_nurse"
          placeholder="ID y tá (to_user_id_nurse)"
          value={form.to_user_id_nurse}
          onChange={handleChange}
        />
        <input
          type="text"
          name="matching_id"
          placeholder="ID matching (matching_id)"
          value={form.matching_id}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Đánh giá (1-5)"
          value={form.rating}
          min="1"
          max="5"
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Tiêu đề phản hồi"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="comment"
          placeholder="Nội dung phản hồi"
          value={form.comment}
          onChange={handleChange}
          rows="4"
        />
        <button type="button" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "⏳ Đang gửi..." : "📩 Gửi phản hồi"}
        </button>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="history-section">
        <h2>📚 Lịch sử phản hồi đã gửi</h2>
        {feedbacks.length === 0 ? (
          <p>Bạn chưa gửi phản hồi nào.</p>
        ) : (
          feedbacks.map((fb) => (
            <div key={fb._id} className="survey-entry">
              <p><strong>🧑‍⚕️ Y tá ID:</strong> {fb.to_user_id_nurse}</p>
              <p><strong>🌟 Đánh giá:</strong> {fb.rating}/5</p>
              <p><strong>📌 Tiêu đề:</strong> {fb.title}</p>
              <p><strong>📝 Nội dung:</strong> {fb.comment}</p>
              <p><strong>🕒 Thời gian:</strong> {new Date(fb.createdAt).toLocaleString()}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feedback;
