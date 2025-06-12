const express = require('express');
const path = require('path');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://frontend-domain.com'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  res.status(200).json({
    message: 'Đăng nhập thành công',
    token: 'fake-jwt-token-for-demo',
    card_id,
    role: card_id.startsWith('2') ? 'elderly' : 'mentee'
  });
});

// API: Gửi khảo sát - Bệnh nhân
app.post('/api/survey/submit', async (req, res) => {
  try {
    console.log('📤 Dữ liệu khảo sát gửi đi:', req.body);
    const token = req.headers['authorization'];

    const proxyRes = await fetch('https://phuchwa-project.onrender.com/survey/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token || ''
      },
      body: new URLSearchParams(req.body).toString(),
    });

    const text = await proxyRes.text();
    console.log('🧾 Phản hồi backend:', proxyRes.status, text);
    res.status(proxyRes.status).send(text);
  } catch (err) {
    console.error('❌ Lỗi proxy khảo sát:', err);
    res.status(500).json({ message: 'Lỗi gửi khảo sát qua proxy.' });
  }
});

// API: Lấy câu hỏi test hôm nay
app.get('/api/test/questions/today', async (req, res) => {
  try {
    const token = req.headers['authorization'];

    const proxyRes = await fetch('https://phuchwa-project.onrender.com/test/questions/today', {
      headers: { 'Authorization': token || '' }
    });

    const data = await proxyRes.text();
    res.status(proxyRes.status).send(data);
  } catch (err) {
    console.error('❌ Lỗi lấy câu hỏi:', err);
    res.status(500).json({ message: 'Không lấy được câu hỏi' });
  }
});

// API: Nộp bài kiểm tra
app.post('/api/test/submit', async (req, res) => {
  try {
    const token = req.headers['authorization'];

    const proxyRes = await fetch('https://phuchwa-project.onrender.com/test/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token || ''
      },
      body: JSON.stringify(req.body)
    });

    const text = await proxyRes.text();
    res.status(proxyRes.status).send(text);
  } catch (err) {
    console.error('❌ Lỗi gửi bài test:', err);
    res.status(500).json({ message: 'Không gửi được bài kiểm tra' });
  }
});

// API proxy: Lấy danh sách elderly (cho nurse matching)
app.get('/api/elderly', async (req, res) => {
  try {
    const token = req.headers['authorization'];

    const response = await fetch('https://phuchwa-project.onrender.com/elderly', {
      headers: {
        'Authorization': token || ''
      }
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    console.error('❌ Lỗi tải danh sách elderly:', err);
    res.status(500).json({ message: 'Không thể tải danh sách elderly' });
  }
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
