import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React from "react";

const MySwal = withReactContent(Swal);

export const showTestResultPopup = (data) => {
  const {
    attempt_id,
    total_questions,
    correct_answers,
    score,
    average_score,
    current_score,
  } = data;

  MySwal.fire({
    title: `🎉 Kết quả bài làm #${attempt_id}`,
    html: (
      <div style={{ textAlign: "left" }}>
        <p>
          <strong>Tổng số câu:</strong> {total_questions}
        </p>
        <p>
          <strong>Số câu đúng:</strong> {correct_answers}
        </p>
        <p>
          <strong>Điểm hiện tại:</strong> {current_score}
        </p>
        <p>
          <strong>Điểm trung bình:</strong> {average_score}
        </p>
        <p>
          <strong>Tổng điểm:</strong> {score}
        </p>
      </div>
    ),
    icon: "success",
    confirmButtonText: "👍 Đã hiểu",
    width: 600,
  });
};
