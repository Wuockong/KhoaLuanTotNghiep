src/
├── components/            → chứa các component tái sử dụng
│   └── Navbar.js
├── pages/                 → chứa các trang chính
│   ├── CreateCard.js
│   ├── LoginQR.js
│   └── Dashboard.js
├── styles/
│   ├── base/              → chứa các CSS chung (toàn hệ thống)
│   │   ├── buttons.css
│   │   └── common.css
│   ├── components/        → chứa CSS riêng cho component
│   │   └── navbar.css
│   └── pages/             → chứa CSS riêng cho từng trang
│       ├── create-card.css
│       └── login-qr.css
├── App.js
└── index.js

Hướng dẫn cài đặt: clone -> terminal -> tại ..\KhoaLuanTotNghiep, ..\KhoaLuanTotNghiep\client, ..\KhoaLuanTotNghiep\server -> npm install (tải folder node_modules)

Hướng dẫn khởi động:  1) terminal -> tại ..\KhoaLuanTotNghiep\server -> npm run dev 
                      2) file explorer -> tại ..\KhoaLuanTotNghiep\server -> 2 click file start-server.bat
