# Twi-Token-Auth

A full-stack, secure MERN application demonstrating robust JWT-based authentication with access and refresh tokens. This project includes persistent sessions across tab/browser closures and an elegant, responsive UI built with Tailwind CSS.

## 🚀 Features

- **User Authentication**: Secure Login & Registration.
- **JWT Token Management**: Implements Access & Refresh Tokens for seamless authenticated sessions.
- **Persistent Sessions**: Users remain logged in even after refreshing the page or closing the browser.
- **State Management**: Optimized global state handling with Redux Toolkit.
- **Secure Backend Middleware**: Protects private routes relying on HTTP-only cookies and token verification.
- **Modern UI**: Polished, responsive user interface designed with Tailwind CSS and Vite.

## 🛠️ Tech Stack

### Client (Frontend)
- **Framework**: React.js (via Vite)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Cookie Management**: js-cookie & react-cookie

### Server (Backend)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: Custom JWT (jsonwebtoken) & Bcrypt for password hashing
- **Middleware**: cookie-parser, CORS

## 📁 Project Structure

This repository is organized into a `client` and a `server` directory.

### Client Structure
```
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/       # Reusable UI components
│   ├── pages/            # View components (Home, Login, Signup)
│   ├── App.jsx           # Main routing & application wrapper
│   ├── index.css         # Tailwind global styles
│   └── main.jsx          # React DOM mounting
└── package.json
```

### Server Structure
```
server/
├── config/               # Database and Env configurations
├── controller/           # Core API logic
├── middleware/           # Auth verification & generic middleware 
├── model/                # Mongoose Database Schemas
├── routes/               # Express Route Definitions (user, profile, token)
├── .env                  # Environment variables
├── server.js             # Main server entry point
└── package.json
```

## 💻 Getting Started

Follow these instructions to run the application locally.

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed and running or a cloud URI

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the necessary environment variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

Start the backend development server:
```bash
npm run dev
```

### 2. Frontend Setup

Open a new terminal session.
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

## 🛣️ API Endpoints

- `POST /api/user/register` - Create a new user account
- `POST /api/user/login` - Authenticate user and issue tokens
- `GET /api/profile` - Fetch authenticated user profile data
- `POST /api/token/refresh` - Request a new access token using a refresh token

## 📝 License

This project is open-source and available under the ISC License.
