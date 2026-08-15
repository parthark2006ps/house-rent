# 🏠 HouseHunt - House Rent Management System

> A modern, full-stack rental property management and booking platform built with **MongoDB**, **Express.js**, **React**, and **Node.js** (MERN Stack).

[![Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://github.com/parthark2006ps/house-rent)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB.svg)](client/)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933.svg)](server/)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📂 Google Drive Project Documentation & Deliverables

All phase-wise project design documents, requirements, user stories, software architecture, and testing reports are available in the official **Google Drive Repository**:

📌 **Main Documentation Vault**: [MERN Phase Wise (Google Drive Folder)](https://drive.google.com/drive/folders/1qkPbjbTbTsi1rLMlG9i28hPUx0nTBNDI?usp=drive_link)

### 📋 Phase-Wise Deliverables Index

| Phase | Category | Deliverable Document | Google Drive Link |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Brainstorming & Ideation** | 🧠 Brainstorming & Idea Prioritization | [View Document](https://docs.google.com/document/d/1CtFHJZSpCJlj824kBc3uqgT915Y2fW72/edit?usp=drivesdk) |
| **Phase 1** | **Brainstorming & Ideation** | ❓ Define Problem Statements | [View Document](https://docs.google.com/document/d/1vSLNTr6zGA6sVQ_NL0xnFrHez1SoojzE/edit?usp=drivesdk) |
| **Phase 1** | **Brainstorming & Ideation** | 🗺️ Empathy Map Canvas | [View Document](https://docs.google.com/document/d/1zlrWWXDU6HtqC9vwrnU-N6axjNaPimHa/edit?usp=drivesdk) |
| **Phase 2** | **Requirement Analysis** | 📊 Data Flow Diagrams & User Stories | [View Document](https://docs.google.com/document/d/1WyTWFs7Un6nyJpn0F0ZnAccFo0uxIYKn/edit?usp=drivesdk) |
| **Phase 2** | **Requirement Analysis** | 📜 Solution Requirements (FR & NFR) | [View Document](https://docs.google.com/document/d/1vXl-KOc6VjtUOkRw0X2ZQgLgnffarwGu/edit?usp=drivesdk) |
| **Phase 2** | **Requirement Analysis** | 💻 Technology Stack & Architecture | [View Document](https://docs.google.com/document/d/1ZF8Lnx2xx6hEct22S0DYZgp21NXGdCQk/edit?usp=drivesdk) |
| **Phase 3** | **Project Planning** | 📅 Project Planning & Backlog Sprints | [View Document](https://docs.google.com/document/d/1e8_BugbXq8e9SX9g044K1QzAq382KYWG/edit?usp=drivesdk) |
| **Phase 4** | **Project Design** | 📘 Master Project Documentation (HOUSE RENT) | [View Document](https://docs.google.com/document/d/1U9nwq9Q0V13K58Qkp_pON1WEWCd9Ok50/edit?usp=drivesdk) |
| **Phase 4** | **Project Design** | 🎯 Problem–Solution Fit | [View Document](https://docs.google.com/document/d/1IZ5UKrOAJwHEnXMuCLVWDOL-Cpmd1cBw/edit?usp=drivesdk) |
| **Phase 4** | **Project Design** | 💡 Proposed Solution Specification | [View Document](https://docs.google.com/document/d/10GGxA8jmtJ-EcX0hMb23H93aN62k3ShI/edit?usp=drivesdk) |
| **Phase 4** | **Project Design** | 🏗️ Solution Architecture Blueprint | [View Document](https://docs.google.com/document/d/1rL2faoR5MOUr4cETAXCDotwWfFrPAhx8/edit?usp=drivesdk) |
| **Phase 5** | **Development & Testing** | 🧪 User Acceptance Testing (UAT) Report | [View Document](https://docs.google.com/document/d/1bpX37A5sSkx1mlWy7QVF9Vr7BDvnK_HW/edit?usp=drivesdk) |

---

## 🎯 Problem Statement & Proposed Solution

### The Challenge
Traditional house hunting relies heavily on unverified brokers, manual site visits, hidden commission costs, and cumbersome physical paperwork. Both tenants and property owners face delays, lack of transparency, and inefficient booking tracking.

### The Solution
**HouseHunt** provides a streamlined web ecosystem:
- **Verified Listings**: Direct property listings posted by property owners without middleman markup.
- **Digital Applications & Booking**: Tenants browse properties, filter by budget/location/amenities, and schedule property viewings or submit lease requests digitally.
- **Unified Dashboards**: Real-time status monitoring for both tenants (active applications/bookings) and owners (listing management & request approvals).

---

## ✨ Key Features

- 🔍 **Advanced Property Search & Filter**: Search by city, rental budget range, property type, and available amenities.
- 🏡 **Comprehensive Property Details**: Detailed view featuring photo galleries, location highlights, and amenity specifications.
- 🔑 **Secure Authentication**: User sign-up and sign-in powered by JSON Web Tokens (JWT) and `bcrypt` password hashing.
- ➕ **Property Posting**: Owners can seamlessly add new property listings with location, pricing, image URLs, and property highlights.
- 📅 **Direct Booking & Viewing Requests**: Tenants can submit rental requests and view booking status in real-time.
- 📊 **Owner & Tenant Dashboards**: Easily track posted listings, review incoming rental applications, and manage user profiles.
- 📱 **Responsive UI**: Intuitive modern layout engineered with React 18, Vite, and custom CSS styling.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 (with Vite dev server)
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Styling**: Modern Vanilla CSS Design System

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ORM)
- **Authentication**: JSON Web Tokens (JWT) & `bcryptjs`
- **Configuration & Security**: CORS, `dotenv`

---

## 🏗️ System Architecture & Folder Structure

```
house-rent/
├── client/              # Frontend Application (React + Vite)
│   ├── src/
│   │   ├── components/  # Modals, Navbar, Cards, Forms
│   │   ├── context/     # Global Context (Auth Context)
│   │   ├── services/    # API Service Layer (Axios client)
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/              # Backend API Server (Express + MongoDB)
│   ├── config/          # MongoDB Connection setup
│   ├── controllers/     # Controller handlers (Auth, Property, Booking)
│   ├── models/          # Data Schemas (User, Property, Booking)
│   ├── routes/          # API Route endpoints
│   ├── server.js        # Express application entry point
│   └── package.json
│
├── package.json         # Root scripts (Concurrent client & server execution)
└── README.md            # Project README & Google Drive Deliverables Index
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/parthark2006ps/house-rent.git
   cd house-rent
   ```

2. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install server dependencies
   cd server && npm install

   # Install client dependencies
   cd ../client && npm install
   cd ..
   ```

3. **Configure Environment Variables**
   Create a `.env` file inside the `server/` directory:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/househunt
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Run Application**
   Launch both backend and frontend concurrently from the root folder:
   ```bash
   npm run dev
   ```
   - **Frontend App**: `http://localhost:5173`
   - **Backend API**: `http://localhost:5000`

---

## 📜 Available Scripts

- `npm run dev`: Concurrently starts both backend and frontend servers.
- `npm run dev:server`: Starts backend server only (`server/server.js`).
- `npm run dev:client`: Starts frontend Vite dev server only.

---

## 👤 Developer & Project Information

- **Developer**: Partha Sarathi R K
- **Project**: House Rent (House Rental Management System)
- **Documentation Vault**: [MERN Phase Wise Folder on Google Drive](https://drive.google.com/drive/folders/1qkPbjbTbTsi1rLMlG9i28hPUx0nTBNDI?usp=drive_link)

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).
