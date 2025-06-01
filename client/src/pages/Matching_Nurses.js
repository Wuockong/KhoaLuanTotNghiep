import React, { useEffect, useState } from 'react';
import '../styles/pages/matching-nurses.css';

function MatchingNursePage() {
  const [elderlies, setElderlies] = useState([]);
  const [filter, setFilter] = useState({ city: '', gender: '', minAge: '', maxAge: '' });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const nurse_id = localStorage.getItem('user_id');

  useEffect(() => {
    fetch('/api/elderly', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setElderlies(data || []);
        setLoading(false);
      })
      .catch(() => {
        alert('Không thể tải danh sách bệnh nhân');
        setLoading(false);
      });
  }, []);

  const handleMatch = async (elderly_id) => {
    try {
      const res = await fetch('/api/matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nurse_id, elderly_id })
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Lỗi');
      alert('✅ Matching thành công');
    } catch (err) {
      alert('❌ Không thể matching: ' + err.message);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    return Math.floor(ageDifMs / (1000 * 60 * 60 * 24 * 365.25));
  };

  const filtered = elderlies.filter(el => {
    const age = calculateAge(el.date_of_birth);
    const cityMatch = filter.city ? el.current_address?.city?.toLowerCase().includes(filter.city.toLowerCase()) : true;
    const genderMatch = filter.gender ? String(el.gender) === filter.gender : true;
    const minAgeMatch = filter.minAge ? age >= parseInt(filter.minAge) : true;
    const maxAgeMatch = filter.maxAge ? age <= parseInt(filter.maxAge) : true;
    return cityMatch && genderMatch && minAgeMatch && maxAgeMatch;
  });

  return (
    <div className="matching-nurse-container">
      <h2>🤝 Kết nối với bệnh nhân</h2>
      <div className="filter-row">
        <select value={filter.city} onChange={(e) => setFilter(prev => ({ ...prev, city: e.target.value }))}>
            <option value="">Tất cả thành phố</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="TP.HCM">TP.HCM</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Cần Thơ">Cần Thơ</option>
            <option value="Hải Phòng">Hải Phòng</option>
        </select>

        <select value={filter.gender} onChange={(e) => setFilter(prev => ({ ...prev, gender: e.target.value }))}>
          <option value="">Giới tính</option>
          <option value="true">Nam</option>
          <option value="false">Nữ</option>
        </select>
        <input
          type="number"
          placeholder="Tuổi từ"
          value={filter.minAge}
          onChange={(e) => setFilter(prev => ({ ...prev, minAge: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Tuổi đến"
          value={filter.maxAge}
          onChange={(e) => setFilter(prev => ({ ...prev, maxAge: e.target.value }))}
        />
      </div>

      {loading ? <p>Đang tải...</p> : (
        <div className="elderly-list">
          {filtered.map((el, index) => (
            <div className="elderly-card" key={index}>
              <h4>{el.full_name}</h4>
              <p>📅 Ngày sinh: {el.date_of_birth}</p>
              <p>📍 Địa chỉ: {el.current_address?.street}, {el.current_address?.city}</p>
              <p>📞 SĐT: {el.phone_number}</p>
              <button className="match-btn" onClick={() => handleMatch(el._id)}>
                Matching
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchingNursePage;
