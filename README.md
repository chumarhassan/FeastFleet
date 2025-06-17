# 🍽️ FeastFleet - MERN Stack Food Ordering App

**FeastFleet** is a full-stack food ordering web application built using the **MERN (MongoDB, Express, React, Node.js)** stack. It allows users to browse food items, add them to a cart, place orders, and manage authentication via JWT.

---

## 👥 Developed By

This is a **group project** developed by:

### 👩‍💻 Zubaria Sajjad
- 🔗 GitHub: [zubaria12](https://github.com/zubaria12)
- 📧 Email: zubariasajjad70@gmail.com

### 👨‍💻 Umar Hassan
- 🔗 GitHub: [chumarhassan](https://github.com/chumarhassan)
- 📧 Email: chumarhassan999@gmail.com

---

## 📌 Features

- 🔐 **User Authentication** (Register/Login)
- 🍕 **Browse Food Items** by Category
- 🔎 **Search Bar** to filter items
- 🛒 **Shopping Cart** with dynamic total
- ✅ **Order Checkout** with confirmation
- 📦 **MongoDB Backend** for data and orders
- ⚛️ **React Context API** for global cart state

---

## ⚙️ Tech Stack

| Technology | Description                            |
|------------|----------------------------------------|
| **MongoDB** | Database for storing users, food items, orders |
| **Express.js** | Backend API and middleware management |
| **React.js** | Frontend UI and components |
| **Node.js** | Server runtime environment |
| **Bootstrap 5** | UI styling and responsive layout |
| **JWT (JSON Web Token)** | Authentication token system |
| **Mongoose** | MongoDB object modeling for Node.js |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js & npm installed
- MongoDB installed & running (local or cloud e.g., MongoDB Atlas)

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/feastfleet.git
cd feastfleet
2. Setup Backend
cd backend
npm install
Create a .env file and add:

MONGO_URI=mongodb://localhost:27017/feastfleet
JWT_SECRET=your_jwt_secret
Run backend server:

npm start
# or
nodemon index.js
Backend runs at: http://localhost:5000

3. Setup Frontend
cd frontend
npm install
npm start
Frontend runs at: http://localhost:3000

📁 Folder Structure (Frontend)

frontend/
│
├── src/
│   ├── components/
│   │   ├── Card.js
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   └── ContextReducer.js
│   │
│   ├── screens/
│   │   ├── Home.js
│   │   ├── Cart.js
│   │   └── Login.js
│   │
│   ├── App.js
│   ├── index.js
│   └── ...
│
├── public/
└── package.json
🔐 Authentication Flow
Register: /createuser

Login: /login

On successful login:

localStorage saves authToken and userEmail

User is redirected to Home page

authToken is used to authorize requests like placing orders

📦 API Endpoints (Backend)
➤ POST /api/createuser
Registers a new user.

➤ POST /api/loginuser
Logs in an existing user and returns JWT.

➤ POST /api/foodData
Returns food items and categories.

➤ POST /api/orderData
Saves order for the authenticated user.

✨ Screens Summary
Home.js
Displays food categories and items

Includes carousel and search functionality

Cart.js
Shows current cart items

Supports item removal and checkout

Confirms successful order

Login.js
Authenticates user

Redirects on successful login

🧠 State Management
React Context API used to store cart state globally via ContextReducer.js.

🧪 Test Accounts
You can register a new user via the frontend. No admin panel is currently integrated.

📌 Future Enhancements
🧾 Admin panel to manage items and categories

📊 Order history for users

💳 Payment gateway integration

📱 Mobile responsiveness improvements

🔔 Toast notifications for cart actions

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

📬 Contact
For any inquiries, feel free to reach out to the developers:

Zubaria Sajjad – zubariasajjad70@gmail.com

Umar Hassan – chumarhassan999@gmail.com

---
