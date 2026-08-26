# 📚 Personal Book Library

ระบบจัดการคลังหนังสือส่วนบุคคล (Personal Book Library)

โปรเจกต์นี้เป็น Web Application สำหรับจัดการข้อมูลหนังสือ ผู้เขียน และหมวดหมู่
พร้อมระบบ Authentication ด้วย JWT โดยแยกการทำงานเป็น Frontend และ Backend API

---

## 📌 Features
- 🔐 Login ด้วย Username / Password
- 🔑 Authentication ด้วย JWT
- 📚 เพิ่มหนังสือ
- ✏️ แก้ไขข้อมูลหนังสือ
- 🗑️ ลบหนังสือ
- 🔎 ค้นหาหนังสือจากชื่อ
- 🏷️ กรองหนังสือตามหมวดหมู่
- ✍️ กรองหนังสือตามผู้เขียน
- 👤 เพิ่มผู้เขียน
- 🏷️ เพิ่มหมวดหมู่
- 📖 แสดงข้อมูลผู้เขียนของหนังสือ
- 📂 แสดงหมวดหมู่ของหนังสือ
- 📱 Responsive UI
- 🛡️ Protected API ด้วย JWT

---

# 🛠️ Technology Stack
## Frontend
- React.js
- Vite
- JavaScript
- Axios
- CSS

## Backend
- Node.js
- Express.js
- Sequelize ORM
- JWT
- bcrypt
- CORS

## Database
- MySQL
- phpMyAdmin สำหรับจัดการ Database

### Development Tools
- Git
- GitHub
- Postman
- phpMyAdmin

---

## 📂 Project Structure

personal-book-library/
├── api/
├── backend/
│   ├── migrations/
│   ├── seeders/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── .sequelizerc
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── database/
│   ├── ER Diagram Database.png
│   └── schema.sql
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── REFLECTION.md

---

# ⚙️ Requirements
ก่อนเริ่มต้นใช้งาน จำเป็นต้องติดตั้ง:
- Node.js
- npm
- MySQL
- Git
ตรวจสอบ Version:
- node -v
- npm -v
- mysql --version
- git --version

---

# 🚀 Installation
1. Clone Project
git clone (https://github.com/HiDekCom/personal-book-library.git)
เข้าไปยัง Project: cd personal-book-library

---

# 🔵 Backend Setup
เข้าสู่ Backend: cd backend
ติดตั้ง Dependencies: npm install
สร้างไฟล์: backend/.env
ตัวอย่าง:
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=personal_book_library
DB_USER=root
DB_PASSWORD=

JWT_SECRET=personal_book_library_secret_2026
JWT_EXPIRES_IN=1d

# 🗄️ Database Setup
สร้าง Database ใน MySQL: CREATE DATABASE personal_book_library;

จากนั้นตรวจสอบ Database Configuration ให้ตรงกับ .env
ตัวอย่าง:
DB_HOST=localhost
DB_PORT=3306
DB_NAME=personal_book_library
DB_USER=root
DB_PASSWORD=

# 🔄 Database Migration
เข้าสู่โฟลเดอร์ Backend: cd backend
Run Migration: npx sequelize-cli db:migrate
ตรวจสอบ Migration: npx sequelize-cli db:migrate:status

# ▶️ Run Backend
- npm run dev
Backend จะทำงานที่: http://localhost:5000

---

# 🟢 Frontend Setup
เปิด Terminal ใหม่
- cd frontend

ติดตั้ง Dependencies: npm install
สร้างไฟล์: frontend/.env
ตัวอย่าง: VITE_API_URL=http://localhost:5000/api
จากนั้น Run: npm run dev

Frontend จะทำงานที่: http://localhost:5173

---

# 🔐 Login
เปิดเว็บไซต์: http://localhost:5173

เข้าสู่หน้า Login ใช้ Username และ Password ที่กำหนดไว้
Username: admin
Password: admin123

---

# 🔑 Authentication
ระบบใช้ JWT (JSON Web Token) สำหรับ Authentication
Flow:
                    User
                     │
                     │ Login
                     ▼
                  Frontend
                     │
                     │ POST /api/auth/login
                     ▼
                   Backend
                     │
                     │ ตรวจสอบ Username / Password
                     ▼
                  JWT Token
                     │
                     ▼
                  Frontend
                     │
                     │ ส่ง Authorization Header
                     ▼
                 Protected API
Protected API จะตรวจสอบ Token ก่อนอนุญาตให้เข้าถึงข้อมูล

---

# 🧪 Testing
สามารถทดสอบ API ด้วย Postman
ตัวอย่าง Login:
POST http://localhost:5000/api/auth/login

Body:
{
  "username": "admin",
  "password": "admin123"
}

---

# 📖 Documentation
รายละเอียดเพิ่มเติมของแต่ละส่วน:
backend/README.md
frontend/README.md