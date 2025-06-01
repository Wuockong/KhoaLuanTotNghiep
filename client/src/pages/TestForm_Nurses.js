import React, { useEffect, useState } from 'react';
import '../styles/pages/testform-nurses.css';


function TestForm({ onSubmit }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    fetch('/api/test/questions/today', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => alert('Không tải được câu hỏi'));
  }, []);

  const handleChange = (questionIndex, value) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      questions: questions.map((q, index) => ({
        question: q.question,
        difficulty: q.difficulty,
        options: q.options,
        correct_answer: q.correct_answer,
        user_answer: answers[index] || ""
      }))
    };

    try {
      const res = await fetch('/api/test/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      alert('✅ Nộp bài thành công!');
      onSubmit && onSubmit();
    } catch (err) {
      alert('❌ Lỗi nộp bài: ' + err.message);
    }
  };

  if (loading) return <div className="test-loading">Đang tải câu hỏi...</div>;

  return (
    <div className="test-form-fullscreen">
      <h2>📝 Bài kiểm tra hôm nay</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <p><strong>{index + 1}. {q.question}</strong></p>
            {q.options.map((opt, i) => (
              <label key={i} className="option-item">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={opt}
                  onChange={(e) => handleChange(index, e.target.value)}
                  required
                /> {opt}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-btn">Nộp bài</button>
      </form>
    </div>
  );
}

export default TestForm;
