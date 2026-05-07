# 📧 Inboox AI — Smart Email Reply Generator

> Generate professional email replies instantly using Groq AI.  
> Built with Next.js + Java Spring Boot + MongoDB Atlas.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=nextdotjs)
![Java](https://img.shields.io/badge/Java-17+-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green?style=flat-square&logo=springboot)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-darkgreen?style=flat-square&logo=mongodb)
![Groq](https://img.shields.io/badge/Groq-AI-red?style=flat-square)

---

## ✨ Features

- 📝 Paste any email and get an AI-generated reply instantly
- 🎨 Choose reply tone — Professional, Friendly, Apologetic, Assertive, Formal, Follow-up
- 💬 Add optional context for more personalized replies
- 📋 Copy reply to clipboard in one click
- 🔄 Regenerate for a different variation
- 🕓 History page — view and delete all past replies
- 🔐 Authentication — Manual signup + Google OAuth2 login
- 📱 Fully responsive — works on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, Tailwind CSS, App Router |
| Backend | Java 17, Spring Boot 3.x, Maven |
| Database | MongoDB Atlas (Cloud) |
| AI | Groq AI API (llama-3.1-8b-instant) |
| Auth | Spring Security, JWT, Google OAuth2 |

---

## 📁 Project Structure

```
InbooxAi/
├── inboox-ai-backend/               ← Spring Boot backend
│   ├── src/main/java/com/inbooxai/
│   │   ├── controller/             ← REST API endpoints
│   │   ├── service/                ← Business logic + Groq API calls
│   │   ├── model/                  ← MongoDB Documents (User, EmailReply)
│   │   ├── repository/             ← Spring Data MongoDB repositories
│   │   ├── dto/                    ← Request/Response DTOs
│   │   └── security/               ← JWT, OAuth2, Security config
│   └── src/main/resources/
│       └── application.properties
│
├── inboox-ai-frontend/              ← Next.js frontend
│   ├── app/
│   │   ├── page.jsx                ← HomePage
│   │   ├── history/page.jsx        ← HistoryPage
│   │   ├── login/page.jsx          ← LoginPage
│   │   ├── register/page.jsx       ← RegisterPage
│   │   └── auth/callback/page.jsx  ← OAuth2 Callback
│   ├── components/                 ← Navbar, ProtectedRoute, UI components
│   ├── lib/                        ← Axios API calls
│   └── .env.local
│
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have these installed:

- [Java 17+](https://adoptium.net/)
- [Maven 3.9+](https://maven.apache.org/download.cgi)
- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/)

---

## 🔑 API Keys Required

### 1. Groq AI API Key (Free)
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up / Login
3. Click **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_...`)
5. Free tier: **14,400 requests/day** ✅

### 2. MongoDB Atlas (Free)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free account → **Free M0 Cluster**
3. Database Access → Add user with password
4. Network Access → Allow from anywhere (`0.0.0.0/0`)
5. Connect → Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/emailai
   ```

### 3. Google OAuth2 Credentials
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project → **Email AI App**
3. APIs & Services → Credentials → **Create OAuth 2.0 Client ID**
4. Add Authorized redirect URI:
   ```
   http://localhost:8080/login/oauth2/code/google
   ```
5. Copy **Client ID** and **Client Secret**

---

## 🚀 Getting Started

### Step 1 — Clone the repo

```bash
git clone https://github.com/thevishessh/Ai-Email-Reply-Generator.git
cd InbooxAi
```

### Step 2 — Set Backend Environment Variables

**Windows:**
```bash
set GROQ_API_KEY=gsk_XXXXXXXXXXXXXXXXXXXX
set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/emailai
set GOOGLE_CLIENT_ID=your_google_client_id
set GOOGLE_CLIENT_SECRET=your_google_client_secret
set JWT_SECRET=myEmailAiSuperSecretKey2025XYZ
```

**Mac/Linux:**
```bash
export GROQ_API_KEY=gsk_XXXXXXXXXXXXXXXXXXXX
export MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/emailai
export GOOGLE_CLIENT_ID=your_google_client_id
export GOOGLE_CLIENT_SECRET=your_google_client_secret
export JWT_SECRET=myEmailAiSuperSecretKey2025XYZ
```

### Step 3 — Set Frontend Environment Variables

Create `inboox-ai-frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Step 4 — Run the Backend

```bash
cd inboox-ai-backend
mvn spring-boot:run
```

Backend starts at: `http://localhost:8080`

### Step 5 — Run the Frontend

Open a new terminal:

```bash
cd inboox-ai-frontend
npm install
npm run dev
```

Frontend starts at: `http://localhost:3000`

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register with email & password |
| POST | `/api/auth/login` | Login with email & password |
| GET | `/api/auth/me` | Get current logged-in user |
| GET | `/oauth2/authorization/google` | Google OAuth2 login |

### Email Replies
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/email/generate` | Generate AI reply |
| GET | `/api/email/history` | Get user's reply history |
| DELETE | `/api/email/history/{id}` | Delete a reply |

---

## 🗄️ MongoDB Collections

### users
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "password": "string (BCrypt hashed)",
  "provider": "LOCAL | GOOGLE",
  "googleId": "string (nullable)",
  "createdAt": "timestamp"
}
```

### email_replies
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: users)",
  "originalEmail": "string",
  "tone": "string",
  "contextNote": "string",
  "generatedReply": "string",
  "createdAt": "timestamp"
}
```

---

## 🌐 Environment Variables Reference

| Variable | Where | Description |
|---|---|---|
| `GROQ_API_KEY` | Backend | Groq AI API key |
| `MONGODB_URI` | Backend | MongoDB Atlas connection string |
| `GOOGLE_CLIENT_ID` | Backend | Google OAuth2 Client ID |
| `GOOGLE_CLIENT_SECRET` | Backend | Google OAuth2 Client Secret |
| `JWT_SECRET` | Backend | JWT signing secret |
| `NEXT_PUBLIC_API_URL` | Frontend | Backend base URL |

---

## 📸 Screenshots
<img width="1889" height="907" alt="Screenshot 2026-04-29 235702" src="https://github.com/user-attachments/assets/1b375239-e32b-41ee-8bfd-892e6d09146c" />

<img width="1419" height="881" alt="Screenshot 2026-04-29 235730" src="https://github.com/user-attachments/assets/cfc3f5b9-2b5c-4145-8872-0bc0e0c99c82" />

<img width="1886" height="902" alt="Screenshot 2026-04-29 235848" src="https://github.com/user-attachments/assets/717dca78-118a-4b67-a255-b98d73c4e6ce" />

<img width="1901" height="900" alt="Screenshot 2026-04-29 235907" src="https://github.com/user-attachments/assets/2a9fb729-ee03-4c0d-b8b1-b6be58c27850" />

<img width="1626" height="728" alt="Screenshot 2026-04-29 235920" src="https://github.com/user-attachments/assets/c9710371-fe5c-4c91-8a7a-50449157829c" />

<img width="1893" height="907" alt="Screenshot 2026-04-29 235935" src="https://github.com/user-attachments/assets/f07feb76-9ba5-4653-8c5d-7099d6040f75" />

<img width="1894" height="898" alt="Screenshot 2026-04-29 235957" src="https://github.com/user-attachments/assets/5f194deb-4dec-460a-af9c-0399fb8724c1" />



## 🚢 Deployment

| Part | Platform | Notes |
|---|---|---|
| Frontend | [Vercel](https://vercel.com) | Add `NEXT_PUBLIC_API_URL` in env |
| Backend | [Render](https://render.com) / [Railway](https://railway.app) | Add all backend env variables |
| Database | MongoDB Atlas | Already cloud-hosted ✅ |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

---

## 📄 License

MIT License — free to use and modify.

---

## 👨‍💻 Built By

**thevishessh** — [GitHub](https://github.com/thevishessh)
