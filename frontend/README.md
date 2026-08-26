# 💻 Personal Book Library - Frontend

Frontend ของระบบ Personal Book Library

พัฒนาด้วย React.js และ Vite
เชื่อมต่อกับ Backend API ผ่าน Axios

---

# 🛠️ Tech Stack
- React.js
- Vite
- Axios
- JavaScript
- CSS

---

# 📂 Project Structure

frontend/
│
├── src/
│   │
│   ├── api/
│   │   ├── auth.api.js
│   │   ├── axios.js
│   │   ├── book.api.js
│   │   └── category.api.js
│   │
│   ├── components/
│   │   ├── AuthorForm.jsx
│   │   ├── BookForm.jsx
│   │   ├── BookList.jsx
│   │   ├── CategoryForm.jsx
│   │   ├── Filter.jsx
│   │   └── Loading.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── Books.jsx
│   │   └── Login.jsx
│   │
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
└── README.md

---

# 🚀 Installation
เข้าสู่ Frontend: cd frontend
ติดตั้ง Dependencies: npm install

---

# ⚙️ Environment Variables
สร้างไฟล์: .env
ตัวอย่าง: VITE_API_URL=http://localhost:5000/api

---

# ▶️ Run Development Server
- npm run dev
Vite จะแสดง URL สำหรับเปิดเว็บไซต์ เช่น: http://localhost:5173

---

# 🔐 Authentication
Frontend มีหน้า Login สำหรับเข้าสู่ระบบ
Flow:

                Login
                  ↓
    Backend ตรวจสอบ Username / Password
                  ↓
            ได้รับ JWT Token
                  ↓
              เก็บ Token
                  ↓
          เรียก Protected API

เมื่อ Logout:
                Logout
                  ↓
        ลบ Authentication Data
                  ↓
            กลับไปหน้า Login

---

## 🔑 Test Login
Username: admin
Password: admin123
หลังจาก Login สำเร็จ ระบบจะเข้าสู่หน้า Books Dashboard

---

# 📚 Book Management
ผู้ใช้สามารถ:
- ดูรายการหนังสือ
- เพิ่มหนังสือ
- แก้ไขหนังสือ
- ลบหนังสือ
- ค้นหาหนังสือ
- Filter ตาม Category
- Filter ตาม Author

---

# ✍️ Author Management
ผู้ใช้สามารถเพิ่มผู้เขียนใหม่จากหน้า Books
เมื่อเพิ่มสำเร็จ รายชื่อผู้เขียนจะถูกโหลดใหม่
และสามารถเลือกผู้เขียนสำหรับหนังสือได้ทันที
รองรับการเลือกผู้เขียนหลายคน:
Book
 ├── Author 1
 ├── Author 2
 └── Author 3

---

# 🏷️ Category Management
ผู้ใช้สามารถเพิ่มหมวดหมู่ใหม่
หลังจากเพิ่มสำเร็จ หมวดหมู่ใหม่จะปรากฏในรายการ
สำหรับเลือกตอนเพิ่มหรือแก้ไขหนังสือ

---

# 🔎 Search & Filter
ระบบรองรับ:
Search - ค้นหาจากชื่อหนังสือ
Category Filter - กรองตามหมวดหมู่
Author Filter - กรองตามผู้เขียน

---

# 🎨 User Interface
หน้าเว็บประกอบด้วย:
    Login
      ↓
    Books Dashboard
    │
    ├── Summary
    ├── Add Author
    ├── Add Category
    ├── Add Book
    ├── Search / Filter
    └── Book List
        ├── Edit
        └── Delete

---

# ⚠️ Error Handling
Frontend มีการจัดการ:
- Loading State
- API Error
- Login Error
- Validation Error
- Delete Confirmation
- Authentication Error

---

# 🔌 API Connection
Frontend ใช้ Axios สำหรับเชื่อมต่อ Backend
Base API: http://localhost:5000/api

ตัวอย่าง: api.get("/books"); และ api.post("/books", bookData);

---

# 📱 Responsive Design
หน้าเว็บรองรับการแสดงผลบน:
- Desktop
- Laptop
- Tablet
- Mobile