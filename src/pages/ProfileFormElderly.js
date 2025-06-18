import React, { useState, useEffect } from 'react';
import api from '../services/apiClient';
import { useNavigate } from 'react-router-dom';


function ProfileForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_id: '', // 👈 THÊM user_id vào state
    full_name: '',
    gender: true,
    date_of_birth: '',
    permanent_address: {
      street: '',
      city: '',
      country: 'Việt Nam',
    },
    current_address: {
      street: '',
      city: '',
      country: 'Việt Nam',
    },
    insurance_number: '',
    phone_number: '',
    avatar_url: '',
  });

  // ✅ Gán user_id vào form ngay sau khi load component
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      setForm((prevForm) => ({ ...prevForm, user_id: userId }));
    }
  }, []);

  const handleChange = (e, nested = null) => {
    if (nested) {
      setForm({ ...form, [nested]: { ...form[nested], [e.target.name]: e.target.value } });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.user_id) {
      alert('❌ Thiếu user_id để lưu hồ sơ');
      return;
    }

    try {
      await api.post('/elderly', form);
      alert('✅ Tạo hồ sơ thành công!');
      navigate('/dashboard');
    } catch (err) {
      alert('❌ Tạo hồ sơ thất bại: ' + (err.response?.data?.error || 'Lỗi server'));
    }
  };

  return (
    <div className="container">
      <div className="card-box">
        <h2>Hoàn tất hồ sơ cá nhân</h2>
        <form onSubmit={handleSubmit}>
          <input name="full_name" placeholder="Họ tên" value={form.full_name} onChange={handleChange} required />
          <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} required />
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value={true}>Nam</option>
            <option value={false}>Nữ</option>
          </select>

          <h4>Địa chỉ thường trú</h4>
          <input name="street" placeholder="Số nhà, đường..." value={form.permanent_address.street} onChange={(e) => handleChange(e, 'permanent_address')} />
          <input name="city" placeholder="Thành phố" value={form.permanent_address.city} onChange={(e) => handleChange(e, 'permanent_address')} />

          <h4>Địa chỉ tạm trú</h4>
          <input name="street" placeholder="Số nhà, đường..." value={form.current_address.street} onChange={(e) => handleChange(e, 'current_address')} />
          <input name="city" placeholder="Thành phố" value={form.current_address.city} onChange={(e) => handleChange(e, 'current_address')} />

          <input name="insurance_number" placeholder="Mã BHYT" value={form.insurance_number} onChange={handleChange} />
          <input name="phone_number" placeholder="Số điện thoại" value={form.phone_number} onChange={handleChange} />
          <input name="avatar_url" placeholder="Link ảnh đại diện (tùy chọn)" value={form.avatar_url} onChange={handleChange} />

          <button type="submit">Lưu hồ sơ</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
