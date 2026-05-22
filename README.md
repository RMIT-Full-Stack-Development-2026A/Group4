# TicTacToang – Online TicTacToe Gaming Platform

TicTacToang is a modern full-stack web application that transforms the classic Tic-Tac-Toe experience into a scalable online multiplayer platform. The system supports local gameplay, AI opponents, real-time online matches, premium subscriptions, match replay systems, and administrative management features.

Developed for the RMIT Full Stack Development course, the project follows layered and modular architecture principles while applying responsive UI design, secure authentication, and real-time communication technologies.

---

## 📋 Project Information

| Item | Details |
|---|---|
| Course | COSC2769 / COSC2808 – Full Stack Development |
| Project | TicTacToang – Online TicTacToe Gaming Platform |
| Architecture | N-Tier + Modular Monolith |
| Deployment | Cloud Deployment (Render) |
| Methodology | Agile / Iterative Development |
| Repository Management | GitHub + Project Board |

---

## 🔗 GitHub Repository

**[https://github.com/RMIT-Full-Stack-Development-2026A/Group4](https://github.com/RMIT-Full-Stack-Development-2026A/Group4)**

---

## 🌐 Live Deployment

The application is deployed on Render and accessible online at:

**https://group4-loir.onrender.com**

| Service | Platform |
|---|---|
| Frontend | Render |
| Backend | Render |
| Database | MongoDB Atlas |

---

## 👥 Team Members

There were 3 total members within the team, therefore total contribution score is 15.

| No. | Name | Student ID | Role | Main Responsibility | Contribution Score 
|---|---|---|---|---|---|---|
| 1 | Lam Quan Du | s4099918 | Tech Lead | Authentication, Game | 5 |
| 2 | Hung La Tran | s4123461 | Code Maintainer / Project Manager | Subscription, Admin, Refactoring | 5 |
| 3 | Nguyen Hoang Son | s3990627 | System Architect / UI Design | Profile, Lobby | 5 |

---

## 🔐 Login Credentials for Testing

### Player Account
| Field    | Value            |
|----------|------------------|
| Username | `kobe`           |
| Email    | `kobe@gmail.com` |
| Password | `O1o32003!?`     |

### Admin Account
| Field    | Value                 |
|----------|-----------------------|
| Username | `superpeter`          |
| Email    | `xuanphoi3@gmail.com` |
| Password | `SuperP3ter!!`        |

---

## 🚀 Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (bundled with Node.js)
- MongoDB Atlas or Local MongoDB

---

### 1. Clone the Repository

```bash
git clone https://github.com/RMIT-Full-Stack-Development-2026A/Group4.git
cd Group4
```

---

### 2. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

---

### 3. Configure Environment Variables

Create `.env` files for both frontend and backend.

**Backend — create `backend/.env`:**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

**Frontend — create `frontend/.env`:**
```env
VITE_API_URL=http://localhost:5000
```

---

### 4. Run the Development Servers

Open **two separate terminals**:

**Terminal 1 – Backend:**
```bash
cd backend
node index.js
```

**Terminal 2 – Frontend:**
```bash
cd frontend
npm run dev
```

---

### 5. Open in Browser

Navigate to: **http://localhost:5173**

The backend API runs on: **http://localhost:5000**

---

## 🛠 Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Responsive Design (Desktop / Tablet / Mobile)
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JWS Authentication)

### Architecture & Design
- N-Tier Layered Architecture
- Modular Monolith Backend Structure
- Repository Pattern
- DTO-based Response Handling
- Reusable Component-Based Frontend Design

### Deployment
- Frontend deployed on Render
- Backend deployed on Render
- MongoDB Atlas Database

---

## 🏗 System Architecture

The project follows the architecture requirements defined in the SRS specification.

### Backend Architecture
- Route Layer
- Controller Layer
- Service Layer
- Repository Layer
- Model Layer
- Authentication & Authorization Middleware
- DTO Mapping Layer

### Frontend Architecture
- Pages
- Components
- Hooks
- Services
- Reusable UI Components
- Global API Configuration
- REST HTTP Utility Helper

The system is organized using a modular monolith structure where each module manages its own business domain independently.

---

## ✨ Features Implemented

### ✅ Authentication & Authorization
- User Registration
- Login with JWT Authentication
- Password Hashing using bcrypt
- Password Strength Validation
- Email Syntax Validation
- Role-Based Authorization
- Protected Routes
- Logout with Token Invalidation

---

### ✅ Profile Management
- Update Username, Email, Password, and Country
- Avatar Upload
- Match History Tracking
- Search Match History
- Filter Match History
- Sort Match History by Date

---

### ✅ TicTacToe Gameplay

#### Local Multiplayer
- 2-player local gameplay
- Configurable first player
- Abort game functionality

#### Single Player vs AI
- Easy AI
- Medium AI
- Hard AI

#### Gameplay Features
- 10x10 and 15x15 boards
- Multiple board themes
- Multiple player markers
- Match result recording
- Algebraic board notation support

---

### ✅ Replay System
- Move recording system
- Match replay interface
- Algebraic notation replay visualization

---

### ✅ Premium Subscription
- Local wallet simulation
- Premium subscription purchase
- Simulated Stripe/Payment workflow
- Premium status management
- Email notification after payment

---

### ✅ Admin Dashboard
- View all registered users
- View premium status
- Activate / deactivate player accounts
- Manage online game rooms
- Search game rooms
- Close active rooms

---

## ⚠️ Current Project Status

The project has successfully implemented the majority of features required by the Software Requirements Specification.

### Remaining Feature
The following Ultimo-level feature is currently under development / incomplete:

- Final optimization and polishing for advanced Ultimo gameplay integration and multiplayer networking

All core gameplay systems, authentication, profile management, admin functionalities, and premium features are operational.

---

## 📂 Project Structure

```
project-root/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── reusable/
│   │   └── configs/
│
├── backend/
│   ├── modules/
│   ├── middleware/
│   ├── repositories/
│   ├── services/
│   ├── controllers/
│   └── models/
│
└── README.md
```

---

## 📸 Demonstration Features

The system demonstrates:
- Local multiplayer gameplay
- AI gameplay modes
- Match replay system
- Premium subscription workflow
- Admin management dashboard
- Responsive UI across devices

---

## 📖 Software Engineering Practices

The project follows:
- Agile/Scrum-inspired workflow
- GitHub Project Board tracking
- Iterative development
- Layered software architecture
- Modular backend design
- Clean code and reusable component principles

---

## 📌 Notes

This project was developed for educational purposes as part of the RMIT University Full Stack Development course (COSC2769 / COSC2808).
