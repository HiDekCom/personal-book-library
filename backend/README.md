# 🔧 Personal Book Library - Backend

Backend API สำหรับระบบ Personal Book Library

พัฒนาด้วย Node.js และ Express.js
ใช้ Sequelize สำหรับเชื่อมต่อ MySQL Database
และใช้ JWT สำหรับ Authentication

---

# 🛠️ Tech Stack
- Node.js
- Express.js
- Sequelize
- MySQL
- JWT
- bcrypt
- CORS
- dotenv

---

# 📂 Project Structure

backend/
├── migrations/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── sequelize.config.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── author.controller.js
│   │   ├── book.controller.js
│   │   └── category.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   ├── Author.js
│   │   ├── Book.js
│   │   ├── BookAuthor.js
│   │   ├── Categoey.js
│   │   ├── index.js
│   │   └── User.js
│   │
│   ├── repositories/
│   │   ├── author.repository.js
│   │   ├── book.repository.js
│   │   └── category.repository.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── author.routes.js
│   │   ├── book.routes.js
│   │   └── category.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── author.service.js
│   │   ├── book.service.js
│   │   └── category.service.js
│   │
│   ├── app.js
│   └── server.js
│
├── package.json
├── package-lock.json
└── README.md

---

# 🚀 Installation
เข้าสู่ Backend: cd backend
ติดตั้ง Dependencies: npm install

---

# ⚙️ Environment Variables
สร้างไฟล์: .env

ตัวอย่าง:
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=personal_book_library
DB_USER=root
DB_PASSWORD=

JWT_SECRET=your_jwt_secret

---

# 🗄️ Database Setup
สร้าง Database ใน MySQL: CREATE DATABASE personal_book_library;
จากนั้นรัน Migration: npx sequelize-cli db:migrate
ตรวจสอบ Migration: npx sequelize-cli db:migrate:status

---

# ▶️ Run Server
Development: npm start
Backend: http://localhost:5000

---

# 🔐 Authentication
ระบบใช้ JWT Authentication
Login
POST /api/login

Request:
{
  "username": "username",
  "password": "password"
}
เมื่อ Login สำเร็จ Backend จะส่ง JWT Token กลับมา

---
# 🔑 Test Login
สำหรับทดสอบระบบ Login:
Username: admin
Password: admin123

POST /api/login
{
  "username": "admin",
  "password": "admin123"
}

--- 

# 🧱 Architecture
Backend ใช้แนวทางแยก Layer:

         Route
           ↓
        Controller
           ↓
         Service
           ↓
        Repository
           ↓
         Model
           ↓
        Database

Routes - รับ HTTP Request
Controllers - จัดการ Request / Response
Services - จัดการ Business Logic
Repositories - จัดการ Database Query
Models - กำหนดโครงสร้าง Database ด้วย Sequelize

---

# 🔒 Security
ระบบมีการ
- Hash Password ด้วย bcrypt
- JWT Authentication
- Protected Routes
- Environment Variables สำหรับ Secret
- Input Validation
- Error Handling