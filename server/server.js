const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// API: Đăng ký
app.post('/api/users/register', (req, res) => {
  const { card_id } = req.body;
  console.log('✅ Đăng ký:', card_id);
  res.status(200).json({ message: 'Đăng ký thành công', card_id });
});

// API: Đăng nhập
app.post('/api/users/login', (req, res) => {
  const { card_id } = req.body;
  console.log('✅ Đăng nhập:', card_id);
  res.status(200).json({ message: 'Đăng nhập thành công', card_id });
});

// Phục vụ frontend React
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
