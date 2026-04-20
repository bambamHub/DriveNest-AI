# 🚀 DriveNest - Google Drive Clone (MERN Stack)

DriveNest is a full-stack cloud storage web application inspired by Google Drive. It allows users to upload, organize, preview, and manage files (PDFs, images, videos) with authentication and folder structure support.

---

Signup Page -> 

<img width="1919" height="971" alt="image" src="https://github.com/user-attachments/assets/6744290b-5756-45eb-8ea8-551d364f1ac5" />


Login Page ->
<img width="1914" height="971" alt="image" src="https://github.com/user-attachments/assets/f3295b5f-1ce1-45b1-a8c7-c58f58991be6" />


Dashboard Page ->

<img width="1917" height="973" alt="image" src="https://github.com/user-attachments/assets/2849e1c9-4cf8-4536-a30e-403b41ecf13b" />




## 📌 Features

### 🔐 Authentication

* JWT-based login & signup
* Secure routes with middleware
* Persistent login using localStorage/sessionStorage

### 📁 File & Folder Management

* Create folders
* Upload files (Image, PDF, Video)
* Organized folder structure
* View files inside folders

### 📄 File Preview (Like Google Drive)

* PDF preview (embedded viewer)
* Image preview
* Video playback
* Open file in full screen

### 📤 Upload System

* Drag & Drop upload
* Cloudinary integration
* Supports:

  * JPG / PNG
  * PDF
  * MP4 / WebM

### 🎨 UI/UX (Google Drive Inspired)

* Sidebar navigation (Home, My Drive, Recent, Starred, Trash)
* Table view for files
* Responsive layout
* Clean dark theme UI

---

## 🛠 Tech Stack

### Frontend

* React.js
* Axios
* Redux Toolkit
* React Dropzone
* React Icons
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Multer + Cloudinary

---

## 📂 Folder Structure

```
DriveNest/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`.env`)

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`.env`)

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/drivenest.git
cd drivenest
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 🔥 API Endpoints

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

### Folders

* `GET /api/folders`
* `POST /api/folders`

### Files

* `POST /api/files/upload`
* `GET /api/files/:folderId`

---

## 🧪 Demo Workflow

1. Signup/Login
2. Create Folder
3. Upload file
4. Click file → preview
5. Open full screen

---

## 🐛 Common Issues (Solved)

### ❌ PDF not opening

✔ Fixed using Google Docs viewer iframe

### ❌ Auto logout

✔ Fixed token handling + frontend error handling

### ❌ Upload not working

✔ Fixed multer + Cloudinary config

---

## 🌟 Future Enhancements

* ⭐ Star files
* 🗑 Trash & restore
* 🔗 Shareable links
* ⬇ Download files
* ✏ Rename files
* 🔍 Search functionality

---

## 👨‍💻 Author

**Bambam Kumar Gupta**

B.Tech - MNNIT Allahabad
Full Stack Developer (MERN)

---

## 💼 Why This Project?

This project demonstrates:

* Full-stack development (MERN)
* Authentication & security
* File handling & cloud storage
* Clean UI/UX design
* Real-world system design

---

## ⭐ Final Note

This is a production-ready Google Drive clone built with scalable architecture and modern technologies. Perfect for showcasing in interviews and portfolios.

---

### 🚀 If you like this project, give it a ⭐ on GitHub!
