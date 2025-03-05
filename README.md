# To-Do App

A full-stack To-Do application built with **React (Vite)** for the frontend, **Node.js (Express.js)** for the backend, and **MongoDB** as the database.

## 🛠 Tech Stack

### Frontend:
- React (Vite)
- Tailwind CSS (for styling)
- native fetch (for API calls)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- CORS & dotenv

## 📂 Project Structure
```
📦 to-do-app
├── 📂 frontend   # React Vite project
├── 📂 backend    # Node.js & Express server
└── 📜 README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/todo-app.git
cd to-do-app
```

### 2️⃣ Setup the Backend
```sh
cd backend
npm install  # Install dependencies
```

#### Create a `.env` file in `backend/` and add:
```
PORT=3000
```

#### Start the backend server:
```sh
npm start  # Runs on http://localhost:3000
```

### 3️⃣ Setup the Frontend
```sh
cd ../frontend
npm install  # Install dependencies
```

#### Create a `.env` file in `frontend/` and add:
```
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
```

#### Start the frontend:
```sh
npm run dev  # Runs on http://localhost:5173
```

---
