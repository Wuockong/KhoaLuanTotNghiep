//src/Nurses/ProfileFormNurse
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/apiClient';

function ProfileFormNurse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    level: '',
    experience_years: '',
    specializations: '',
    certifications: '',
    location: '',
    school: '',
    year_of_study: '',
    poseidonHash: '',
    test_score: '',
    class: '',
    course: '',
    major: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...form,
        specializations: form.specializations.split(',').map((s) => s.trim()),
        certifications: form.certifications.split(',').map((c) => c.trim()),
      };
      await api.post('/nurses/profile', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Hồ sơ y tá đã được tạo thành công!');
      navigate('/register-nurse');
    } catch (err) {
      alert('❌ Tạo hồ sơ thất bại: ' + (err.response?.data?.message || 'Lỗi server'));
    }
  };

  return (
    <div className="container">
      <div className="card-box">
        <h2>📋 Hồ sơ Y tá</h2>
        <form onSubmit={handleSubmit}>
          <input name="level" placeholder="Trình độ (VD: standard)" onChange={handleChange} required />
          <input name="experience_years" placeholder="Số năm kinh nghiệm" type="number" onChange={handleChange} required />
          <input name="specializations" placeholder="Chuyên môn (ngăn cách bằng dấu phẩy)" onChange={handleChange} required />
          <input name="certifications" placeholder="Chứng chỉ (ngăn cách bằng dấu phẩy)" onChange={handleChange} required />
          <input name="location" placeholder="Địa chỉ" onChange={handleChange} required />
          <input name="school" placeholder="Trường" onChange={handleChange} required />
          <input name="year_of_study" placeholder="Năm học" type="number" onChange={handleChange} required />
          <input name="poseidonHash" placeholder="Poseidon Hash" onChange={handleChange} required />
          <input name="test_score" placeholder="Điểm kiểm tra" type="number" onChange={handleChange} required />
          <input name="class" placeholder="Lớp" onChange={handleChange} required />
          <input name="course" placeholder="Khóa học" onChange={handleChange} required />
          <input name="major" placeholder="Chuyên ngành" onChange={handleChange} required />

          <button type="submit">Lưu hồ sơ</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileFormNurse;
