# 🔐 Auth System – Full Documentation

A full-stack authentication system built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend), supporting both **email/password** login and **Google OAuth 2.0**.

---

## 📁 Project Structure

```
auth-yt/
├── client/                        # React Frontend (Vite + TailwindCSS)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Login page (email/password + Google OAuth)
│   │   │   └── Signup.jsx         # Signup/Register page
│   │   ├── App.jsx                # Root component with React Router
│   │   └── main.jsx               # App entry point
│   ├── .env                       # Client environment variables
│   └── package.json
│
└── server/                        # Node.js Backend (Express)
    ├── config/
    │   ├── Google.config.js       # Passport.js Google OAuth strategy
    │   └── Mongodb.config.js      # MongoDB connection logic
    ├── controller/
    │   └── Auth.Controller.js     # Register & Login handlers
    ├── model/
    │   └── UserSchema.js          # Mongoose User model
    ├── routes/
    │   └── auth.route.js          # All auth routes
    ├── utils/
    │   └── CreateToken.js         # JWT access & refresh token generators
    ├── app.js                     # Express app entry point
    ├── .env                       # Server environment variables
    └── package.json
```

---

## ⚙️ Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 19, Vite, TailwindCSS 4, React Router v7  |
| Backend    | Node.js, Express 5                              |
| Database   | MongoDB Atlas (Mongoose)                        |
| Auth       | Passport.js, passport-google-oauth20            |
| Tokens     | JSON Web Tokens (JWT)                           |
| Password   | bcrypt                                          |
| HTTP Client| Axios                                           |
| Env        | dotenv                                          |

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** v18 or higher → [Download](https://nodejs.org/)
- **MongoDB Atlas** account (free) → [Sign Up](https://www.mongodb.com/cloud/atlas)
- **Google Cloud Console** account → [console.cloud.google.com](https://console.cloud.google.com/)
- **Git** → [Download](https://git-scm.com/)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Jeet-827/R.com.git
cd auth-yt
```

---

### Step 2 — Install Dependencies

Open **two terminals** and install both frontend and backend:

**Terminal 1 — Server:**
```bash
cd server
npm install
```

**Terminal 2 — Client:**
```bash
cd client
npm install
```

---

### Step 3 — Set Up Environment Variables

#### 🔹 Server `.env` (`server/.env`)

Create or edit the file `server/.env` and add the following:

```env
# ─── MongoDB ──────────────────────────────────────────────────
MONGODB_CONNECT=your_mongodb_connection_string

# ─── JWT ──────────────────────────────────────────────────────
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

# ─── Google OAuth ─────────────────────────────────────────────
CLIENTID=your_google_client_id
CLIENTSECRET=your_google_client_secret
CALLBACKURL=http://localhost:3000/api/auth/google/callback

# ─── Server Port ──────────────────────────────────────────────
PORT=3000
```

#### 🔹 Client `.env` (`client/.env`)

Create or edit the file `client/.env` and add:

```env
VITE_SIGNUP_ROUTE=http://localhost:3000/api/auth/register
```

---

### Step 4 — Run the App

**Terminal 1 — Start the Backend Server:**
```bash
cd server
npm run dev
```

Server starts at → `http://localhost:3000`

**Terminal 2 — Start the Frontend:**
```bash
cd client
npm run dev
```

Frontend starts at → `http://localhost:5173`

---

## 🔑 How to Get Your Keys

### 1. MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and **sign in or create an account**.
2. Click **"Create a New Cluster"** (free M0 tier).
3. After the cluster is created, click **"Connect"**.
4. Choose **"Connect your application"**.
5. Select **Driver: Node.js**, **Version: 5.5 or later**.
6. Copy the connection string — it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbName>?retryWrites=true&w=majority
   ```
7. Replace `<password>` with your DB user password and `<dbName>` with `Auth` (or your preferred name).
8. Paste this as `MONGODB_CONNECT` in `server/.env`.

> **Tip:** Go to **Network Access** → Add `0.0.0.0/0` to allow connections from any IP during development.

---

### 2. Google OAuth 2.0 Keys (Client ID & Client Secret)

Follow these steps carefully to get your `CLIENTID` and `CLIENTSECRET`:

#### Step A — Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project dropdown at the top → **"New Project"**.
3. Give it a name (e.g., `auth-yt-app`) and click **"Create"**.

#### Step B — Enable the Google+ API / People API

1. In the left sidebar go to **APIs & Services → Library**.
2. Search for **"Google People API"** and click **Enable**.

#### Step C — Configure the OAuth Consent Screen

1. Go to **APIs & Services → OAuth consent screen**.
2. Select **"External"** → Click **"Create"**.
3. Fill in:
   - **App name**: `auth-yt`
   - **User support email**: your email
   - **Developer contact email**: your email
4. Click **"Save and Continue"** through all steps.
5. On the **"Test users"** screen, add your own Google email for testing.
6. Click **"Back to Dashboard"**.

#### Step D — Create OAuth 2.0 Credentials

1. Go to **APIs & Services → Credentials**.
2. Click **"+ Create Credentials"** → **"OAuth client ID"**.
3. Select **Application type: Web application**.
4. Give it a name (e.g., `auth-yt-web-client`).
5. Under **"Authorized redirect URIs"**, click **"+ Add URI"** and enter:
   ```
   http://localhost:3000/api/auth/google/callback
   ```
6. Click **"Create"**.
7. A popup appears with your:
   - **Client ID** → paste as `CLIENTID` in `server/.env`
   - **Client Secret** → paste as `CLIENTSECRET` in `server/.env`

> [!IMPORTANT]
> Never commit your `.env` files to GitHub. The `.gitignore` already excludes them.

---

### 3. JWT Secret Keys

JWT secrets can be any long, random string. Generate strong ones with:

**Option A — Node.js (run in terminal):**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run this command **twice** — once for `JWT_SECRET` and once for `JWT_REFRESH_SECRET`.

**Option B — Online Generator:**
Visit [generate-secret.vercel.app](https://generate-secret.vercel.app/32) and copy the value.

---

## 🌐 API Endpoints

### Base URL: `http://localhost:3000/api/auth`

| Method | Endpoint              | Description                           | Auth Required |
|--------|-----------------------|---------------------------------------|---------------|
| POST   | `/register`           | Register a new user (email + password)| No            |
| POST   | `/login`              | Login with email + password           | No            |
| GET    | `/google`             | Initiate Google OAuth login           | No            |
| GET    | `/google/callback`    | Google OAuth callback (handled by server) | No        |

---

### `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "JohnDoe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response (200):**
```json
{
  "message": "user are registration",
  "user": { "_id": "...", "username": "JohnDoe", "email": "john@example.com" }
}
```

**Error Response (400):**
```json
{ "message": "user already Exist" }
```

---

### `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response (200):**
```json
{
  "message": "user are Login",
  "User": { "_id": "...", "username": "JohnDoe", "email": "john@example.com" }
}
```

**Error Responses (400):**
```json
{ "message": "user not Exist" }
{ "message": "password is wrong" }
```

---

### `GET /api/auth/google`

Redirects the browser to Google's OAuth consent page.

---

### `GET /api/auth/google/callback`

After Google authenticates the user, this endpoint:
1. Creates or finds the user in MongoDB.
2. Generates a JWT **access token** (15 min) and **refresh token** (7 days).
3. Sets the `refreshToken` in a secure **HttpOnly cookie**.
4. Redirects to `http://localhost:5173/signup?accesstoken=<JWT>`.

---

## 🗄️ Database Schema

### User Model (`server/model/UserSchema.js`)

| Field      | Type   | Required | Unique | Notes                              |
|------------|--------|----------|--------|------------------------------------|
| `username` | String | ✅        | ✅      | Display name                       |
| `email`    | String | ✅        | ✅      | Always stored in lowercase         |
| `password` | String | ❌        | ❌      | Null for Google OAuth users        |
| `googleId` | String | ❌        | ❌      | Populated only for OAuth users     |

---

## 🔄 Authentication Flow

### Email / Password Flow

```
Client                          Server                       MongoDB
  │                               │                              │
  │── POST /api/auth/register ───►│                              │
  │   { username, email, pass }   │── findOne({ username/email })►│
  │                               │◄── user exists? ─────────── │
  │                               │── bcrypt.hash(password) ────►│
  │                               │── userModel.create() ───────►│
  │◄── 200 { message, user } ────│                              │
```

```
Client                          Server                       MongoDB
  │                               │                              │
  │── POST /api/auth/login ──────►│                              │
  │   { email, password }         │── findOne({ email }) ───────►│
  │                               │◄── user ────────────────────│
  │                               │── bcrypt.compare(pass) ─────►│
  │◄── 200 { message, User } ────│                              │
```

### Google OAuth Flow

```
Client                     Server (Passport.js)          Google           MongoDB
  │                              │                          │                │
  │── GET /api/auth/google ─────►│                          │                │
  │                              │── Redirect to Google ───►│                │
  │                              │◄── Auth code ────────────│                │
  │                              │── Exchange for tokens ──►│                │
  │                              │◄── Profile data ─────────│                │
  │                              │── findOne({ googleId }) ─────────────────►│
  │                              │◄── user data ─────────────────────────────│
  │                              │── genrateAccess() + genrateRefresh() ─────│
  │◄── Redirect /signup?token ──│                          │                │
```

---

## 🔐 JWT Token Details

| Token         | Secret Env Var        | Expiry | Storage          |
|---------------|-----------------------|--------|------------------|
| Access Token  | `JWT_SECRET`          | 15 min | URL param → localStorage |
| Refresh Token | `JWT_SECRET`          | 7 days | HttpOnly Cookie  |

> [!NOTE]
> Both tokens currently use `JWT_SECRET`. For stronger security, use separate secrets: `JWT_SECRET` for access tokens and `JWT_REFRESH_SECRET` for refresh tokens — it's already defined in your `.env`.

---

## 🛡️ Security Notes

| Feature             | Status | Notes                                              |
|---------------------|--------|----------------------------------------------------|
| Password Hashing    | ✅     | bcrypt with 10 salt rounds                         |
| HttpOnly Cookies    | ✅     | Refresh token protected from JS access             |
| CORS Configured     | ✅     | Only allows `http://localhost:5173`                |
| Session-less Auth   | ✅     | Uses JWT, no server-side sessions                  |
| Email Lowercase     | ✅     | Mongoose schema auto-lowercases emails             |
| .env in .gitignore  | ✅     | Secrets are not committed to Git                   |
| HTTPS in production | ⚠️     | Set `secure: true` on cookies when deploying       |

---

## 🧰 Available Scripts

### Server (`cd server`)

| Command        | Description                   |
|----------------|-------------------------------|
| `npm run dev`  | Start server with nodemon     |

### Client (`cd client`)

| Command          | Description                   |
|------------------|-------------------------------|
| `npm run dev`    | Start Vite dev server         |
| `npm run build`  | Build for production          |
| `npm run lint`   | Run ESLint                    |
| `npm run preview`| Preview the production build  |

---

## 🐛 Troubleshooting

### `E11000 duplicate key error`
MongoDB is throwing a unique constraint error on `username` or `email`. The `Google.config.js` handles this by:
1. First checking for an existing user by `googleId`.
2. Then checking by `email` and linking the `googleId`.
3. Then checking by `username` and linking the `googleId`.
4. Only creating a new user if none of the above match.

### `req.body is undefined`
Make sure these middleware lines are in `app.js` **before** your routes:
```js
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
```

### Google OAuth Redirect URI Mismatch
The callback URL in your Google Cloud Console **must exactly match** `CALLBACKURL` in `server/.env`:
```
http://localhost:3000/api/auth/google/callback
```

### MongoDB Connection Fails
- Check your **IP Whitelist** in MongoDB Atlas (Network Access → `0.0.0.0/0` for development).
- Verify your database password has no special characters, or URL-encode them.

---

## 📦 Server Dependencies

| Package                  | Version   | Purpose                          |
|--------------------------|-----------|----------------------------------|
| `express`                | ^5.2.1    | Web framework                    |
| `mongoose`               | ^9.4.1    | MongoDB ODM                      |
| `passport`               | ^0.7.0    | Authentication middleware        |
| `passport-google-oauth20`| ^2.0.0    | Google OAuth 2.0 strategy        |
| `jsonwebtoken`           | ^9.0.3    | JWT creation & verification      |
| `bcrypt`                 | ^6.0.0    | Password hashing                 |
| `cors`                   | ^2.8.6    | Cross-Origin Resource Sharing    |
| `dotenv`                 | ^17.4.2   | Environment variable loader      |
| `ejs`                    | ^5.0.2    | Server-side templating (for `/`) |
| `debug`                  | ^4.4.3    | Namespaced debug logging         |

## 📦 Client Dependencies

| Package             | Version   | Purpose                        |
|---------------------|-----------|--------------------------------|
| `react`             | ^19.2.0   | UI library                     |
| `react-dom`         | ^19.2.0   | React DOM rendering            |
| `react-router-dom`  | ^7.14.1   | Client-side routing            |
| `axios`             | ^1.15.0   | HTTP requests to backend       |
| `tailwindcss`       | ^4.2.2    | Utility-first CSS framework    |
| `vite`              | ^7.2.4    | Frontend build tool & dev server|

---

*Documentation generated for the `auth-yt` project — Jeet-827/oAuth0.2*
