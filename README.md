# 🏠 HouseHunt - House Rent Management System

A modern, full-stack rental property management and booking platform built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## ✨ Features

- 🔍 **Property Search & Filtering**: Browse rental properties by city, price range, and amenities.
- 🏡 **Property Details & Virtual Tour**: View comprehensive house details, photo galleries, and interactive virtual tour previews.
- 🔑 **User Authentication**: Secure user registration and login powered by JSON Web Tokens (JWT) and bcrypt password hashing.
- ➕ **Post Properties**: Landlords/owners can easily list new properties with location, price, images, and feature highlights.
- 📅 **Property Booking**: Tenants can schedule bookings and viewings directly through the platform.
- 📊 **User & Owner Dashboard**: Manage active listings, view booking requests, and track rental status.
- 📱 **Responsive UI**: Sleek, intuitive interface built with React, Vite, and custom modern styling.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (with Vite)
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ORM)
- **Authentication**: JWT (jsonwebtoken) & bcryptjs
- **Security & CORS**: CORS, dotenv environment handling

---

## 📁 Project Structure

```
house-rent/
├── client/              # React + Vite Frontend
│   ├── src/
│   │   ├── components/  # React Components (Modals, Cards, Navbar, etc.)
│   │   ├── context/     # React Context for State Management
│   │   ├── services/    # API Service layer (Axios)
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/              # Node.js + Express Backend
│   ├── config/          # Database configuration (MongoDB connection)
│   ├── controllers/     # Route handler controllers
│   ├── models/          # Mongoose Schemas (User, Property, Booking)
│   ├── routes/          # API Route endpoints
│   ├── server.js        # Express app entry point
│   └── package.json
│
├── package.json         # Root package.json (Concurrent scripts)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd house-rent
   ```

2. **Install Root & Sub-directory Dependencies**
   ```bash
   # Install root dependencies (concurrently)
   npm install

   # Install server dependencies
   cd server && npm install

   # Install client dependencies
   cd ../client && npm install
   cd ..
   ```

3. **Environment Setup**
   Create a `.env` file in the `server` directory with your configuration:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/househunt
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Run the Application**
   From the root directory, run both the backend server and frontend client concurrently:
   ```bash
   npm run dev
   ```

   - Frontend running at: `http://localhost:5173`
   - Backend running at: `http://localhost:5000`

---

## 📜 Available Scripts

In the root directory, you can run:

- `npm run dev`: Starts both backend server and frontend client simultaneously.
- `npm run dev:server`: Starts only the backend Express server.
- `npm run dev:client`: Starts only the frontend Vite development server.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
