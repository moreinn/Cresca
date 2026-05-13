<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=220&section=header&text=Cresca&fontSize=72&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Your%20Personal%20Learning%20OS%20%7C%20Focus.%20Build.%20Grow.&descAlignY=62&descSize=22" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&pause=1000&color=A78BFA&center=true&vCenter=true&width=650&lines=🎯+Distraction-Free+Focus+Timer;🗺️+Learning+Roadmap+Tracker;📝+AI-Powered+Learning+Journal;🗂️+Project+Board+(Kanban);📚+Knowledge+Hub+%2B+Notion-Style+Notes;📈+Real+Weekly+%26+Monthly+Analytics;🤖+Grok+AI+Coach+That+Knows+Your+Progress" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-22c55e?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Version-1.0.0-a78bfa?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-38bdf8?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-Welcome-f97316?style=for-the-badge" />
</p>

---

## 🧠 What Is Cresca?

Cresca is a **personal learning operating system** built for working professionals and self-taught learners who only have a few hours a day.

Most people who want to learn something new  a new tech skill, a side project, a career pivot fail not because of lack of motivation, but because of three things:

- ❌ **No focus** — distractions kill deep work
- ❌ **No structure** — they don't know what to learn next or where they left off
- ❌ **No visibility** — they can't see their own progress, so they feel stuck

Cresca solves all three in one focused space.

> A full stack developer who works 9–6 can open Cresca after work, see exactly where he left off on his AI/ML journey, start a distraction-free focus session, let Grok AI tell him what to study next  and log everything automatically.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Focus Mode** | Distraction-free Pomodoro timer (25/45/60/90 min). Live note-taking during sessions. Auto-logs study hours to goal on completion. |
| 🗺️ **Learning Roadmap** | 5 predefined paths, 5 stages each, 20–25 topics per path. Click topics to mark Not Started → Learning → Confident. AI reads your progress and suggests what to study next. |
| 📝 **Learning Journal** | Auto-created after every focus session. Captures what you learned, what confused you, your next step, and your focus quality (emoji mood). Builds a searchable diary of your entire journey. |
| 🗂️ **Project Board** | Kanban board (To Do → In Progress → Done) for your dream project. Tasks linked to goals with Low / Medium / High priority. Overall completion percentage. |
| 📚 **Knowledge Hub** | Notion-style notes editor with sidebar navigation, word count, and auto-save. Resource library (links, videos, docs, books) per goal. |
| 📊 **Track Growth** | Real analytics from actual study data. Weekly bar chart, monthly totals, current streak, active days, daily average. AI weekly report from your real numbers. |
| 🤖 **AI Coach (Grok)** | Context-aware AI powered by Grok. On the roadmap it reads your topic progress. On the journal prompt it knows your goal. On weekly report it reads your real stats. |
| 👤 **Profile + Onboarding** | 4-step onboarding wizard — name, learning path, first goal, daily target. Profile page with stats, settings, and daily goal bar on the Today page. |
| 🌙 **Dark Mode** | Full dark mode support persisted in localStorage across all pages. |

---

## 🚀 Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework and routing |
| PostgreSQL | Relational database |
| Sequelize | ORM for database interaction |
| JWT (jsonwebtoken) | Stateless authentication tokens |
| bcryptjs | Password hashing |
| dotenv | Environment variable management |
| Grok API | AI coaching and weekly reports |

### Frontend

| Technology | Purpose |
|---|---|
| React (Create React App) | UI framework |
| React Router DOM | Client-side routing |
| Axios | HTTP requests with auth interceptor |
| Tailwind CSS | Utility-first styling |
| Recharts | Weekly/monthly analytics charts |
| Context API | Global auth state management |

### Infrastructure

| Service | Purpose |
|---|---|
| Railway | Backend hosting + PostgreSQL database |
| Vercel | Frontend hosting with auto-deploy |

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,postgres,tailwind,js,git,github,vscode,postman&theme=dark" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Grok_AI-1DA1F2?style=for-the-badge&logo=x&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white" />
</p>

---

## 🏗️ Architecture

This project follows a clean **RESTful MVC architecture** on the backend.

```
Request → Route → Middleware (Auth) → Controller → Model → Database
                                           ↓
                                       Response
```

- **Routes** — Map URLs to controller functions
- **Middleware** — JWT verification on all protected routes
- **Controllers** — Receive requests, send responses
- **Models** — Sequelize schemas and database interaction only

This separation means changing data logic never requires touching the HTTP layer, and vice versa.

---

## 📁 Project Structure

```
cresca/
├── backend/
│   ├── config/
│   │   └── db.js                   # Sequelize + PostgreSQL connection
│   ├── controllers/
│   │   ├── authController.js        # Register, login, profile
│   │   ├── goalController.js        # CRUD for goals
│   │   ├── studyController.js       # Study logs + weekly/monthly analytics
│   │   ├── noteController.js        # Notes per goal
│   │   ├── resourceController.js    # Resources per goal
│   │   ├── journalController.js     # Learning journal entries
│   │   ├── focusController.js       # Focus session tracking
│   │   ├── roadmapController.js     # Topic progress per path
│   │   ├── taskController.js        # Kanban task management
│   │   └── aiController.js          # Grok AI coach endpoint
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Goal.js
│   │   ├── StudyLog.js
│   │   ├── Note.js
│   │   ├── Resource.js
│   │   ├── JournalEntry.js
│   │   ├── FocusSession.js
│   │   ├── TopicProgress.js
│   │   └── Task.js
│   ├── routes/
│   │   └── ...                      # One route file per model
│   ├── .env
│   └── server.js
│
└── frontend/
    └── src/
        ├── api/
        │   └── axios.js             # Axios instance with auth interceptor
        ├── components/
        │   ├── AiCoach.js           # Reusable AI chat component
        │   └── ProtectedRoute.js    # Route guard using localStorage token
        ├── context/
        │   └── AuthContext.js       # Global auth state
        └── pages/
            ├── Today.js             # Home dashboard
            ├── FocusMode.js         # Pomodoro timer + journal prompt
            ├── Journal.js           # Learning journal browser
            ├── Roadmap.js           # Learning path tracker
            ├── ProjectBoard.js      # Kanban board
            ├── KnowledgeHub.js      # Notes + resource library
            ├── TrackGrowth.js       # Analytics + AI weekly report
            ├── Dashboard.js         # Goal management
            ├── Profile.js           # User settings + stats
            ├── Onboarding.js        # First-time setup wizard
            ├── Login.js
            └── Register.js
```

---

## 🔌 API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login and get JWT token |
| GET | `/api/auth/profile` | Yes | Get own profile |
| PUT | `/api/auth/profile` | Yes | Update name, daily goal, onboarding status |

### Goals

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/goals` | Yes | Get all goals for logged-in user |
| POST | `/api/goals` | Yes | Create a new goal |
| DELETE | `/api/goals/:id` | Yes | Delete goal (owner only) |

### Study Logs + Analytics

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/studylogs` | Yes | Log a study session (updates goal progress) |
| GET | `/api/studylogs/weekly` | Yes | Hours studied per day for last 7 days |
| GET | `/api/studylogs/monthly` | Yes | Total hours, streak, avg daily, active days |

### Notes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/notes/:goalId` | Yes | Get all notes for a goal |
| POST | `/api/notes` | Yes | Create a note |
| PUT | `/api/notes/:id` | Yes | Update note title and content |
| DELETE | `/api/notes/:id` | Yes | Delete a note |

### Resources

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/resources/:goalId` | Yes | Get all resources for a goal |
| POST | `/api/resources` | Yes | Save a resource (link, video, doc, book) |
| DELETE | `/api/resources/:id` | Yes | Delete a resource |

### Focus Sessions

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/focus` | Yes | Save a completed focus session |
| GET | `/api/focus` | Yes | Get all focus sessions for user |

### Learning Journal

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/journal` | Yes | Create journal entry after session |
| GET | `/api/journal` | Yes | Get all journal entries for user |
| GET | `/api/journal/:goalId` | Yes | Get journal entries for a specific goal |

### Roadmap

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/roadmap` | Yes | Get all topic progress for user |
| POST | `/api/roadmap` | Yes | Update a topic status (upsert) |

### Tasks (Project Board)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/tasks` | Yes | Get all tasks for user |
| POST | `/api/tasks` | Yes | Create a task |
| PUT | `/api/tasks/:id` | Yes | Update task (status, priority, title) |
| DELETE | `/api/tasks/:id` | Yes | Delete a task |

### AI Coach

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/ai/coach` | Yes | Send message to Grok AI coach |

---

## 🤖 How the AI Works

The AI coach is powered by **Grok** and is context-aware throughout the app.

**On the Roadmap page** — When you click "What to study next?", the app reads your actual topic progress (which topics are confident, learning, or not started) and builds a prompt from that data before sending to Grok.

**On the Journal prompt** — After a focus session ends, the AI knows which goal you just worked on and how long you studied.

**On Track Growth** — The weekly report button collects your real stats (hours this week, best day, streak, active goals) and sends them to Grok, which returns a mentor-style personal summary.

```
User data (goal + progress + stats)
          ↓
    Context prompt built on frontend
          ↓
    POST /api/ai/coach { message }
          ↓
    Backend sends to Grok API
          ↓
    Response returned to user
```

---

## 🗺️ Learning Paths

```
🌐 Full Stack Web Development  →  HTML → CSS → JS → React → Node.js → PostgreSQL → Deploy
📊 Data Science               →  Python → Pandas → NumPy → Scikit-learn → ML → Deploy
🤖 AI / Machine Learning      →  Math → PyTorch → CNNs → Transformers → LLMs → Agents
⚙️ Backend Development        →  Node.js → APIs → Databases → Redis → Docker → CI/CD
🎨 Frontend Development       →  HTML/CSS → React → Hooks → TypeScript → Next.js → PWA
```

Each path has **5 stages** and **20–25 topics**. Topics cycle through:

```
⬜ Not Started  →  🟡 Learning  →  🟢 Confident  →  ⬜ (reset)
```

Progress is saved per user to the database. AI reads the current state on every request.

---

## ⚡ Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL running locally
- Grok API key

### 1. Clone

```bash
git clone https://github.com/moreinn/cresca.git
cd cresca
```

### 2. Backend setup

```bash
cd backend
npm install
```

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

```bash
npm start
```

App runs on `http://localhost:3000` — the onboarding wizard will guide you through setup.

---

## 🌍 Deployment

| Layer | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Auto-deploys on push to `main` |
| Backend | Railway | Node.js service, root directory = `backend` |
| Database | Railway PostgreSQL | `DATABASE_URL` auto-injected into backend |

### Environment Variables in Production

**Railway (backend):**

```env
DATABASE_URL       → auto-added by Railway PostgreSQL
JWT_SECRET         → your secret key
OPENAI_API_KEY     → your Grok API key
FRONTEND_URL       → https://your-app.vercel.app
NODE_ENV           → production
```

**Vercel (frontend):**

```env
REACT_APP_API_URL  → https://your-railway-url.up.railway.app/api
```

---

## 🔑 Key Concepts Used

| Concept | Implementation |
|---|---|
| JWT Authentication | Stateless auth using signed tokens, no server-side sessions |
| Password Hashing | bcrypt with salt rounds, passwords never stored in plain text |
| Protected Routes | Frontend route guard + backend middleware using JWT |
| User Data Isolation | Every query filtered by `req.user.id` from decoded JWT |
| Upsert Pattern | Roadmap topic progress uses `findOrCreate` for efficiency |
| Context API | React global auth state without external libraries |
| Analytics Aggregation | Sequelize `fn('DATE')` + `fn('SUM')` for daily study grouping |
| AI Context Building | User data assembled on frontend into structured prompts before API call |

---

## 👤 Built By

<p align="center">
  <b>Moinuddin Shaikh</b> — Node.js Backend Developer
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/moinuddin-shaikh-8535333a9">
    <img src="https://img.shields.io/badge/LinkedIn-Moinuddin_Shaikh-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="mailto:moinshek219@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-moinshek219@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
  <a href="https://github.com/moreinn">
    <img src="https://img.shields.io/badge/GitHub-moreinn-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

---

## 📊 GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=moreinn&show_icons=true&theme=tokyonight&hide_border=true" />
</p>

<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=moreinn&theme=tokyonight&hide_border=true" />
</p>

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=moreinn&layout=compact&theme=tokyonight&hide_border=true" />
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=120&section=footer" />
</p>

<p align="center">
  <i>Built for people who are serious about growth but have limited time.</i><br/>
  <i>Every hour you study inside Cresca compounds.</i>
</p>
