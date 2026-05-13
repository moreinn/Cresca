<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=220&section=header&text=Cresca&fontSize=72&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Your%20Personal%20Learning%20OS%20%7C%20Focus.%20Build.%20Grow.&descAlignY=62&descSize=20" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&pause=1000&color=A78BFA&center=true&vCenter=true&width=600&lines=🎯+Distraction-Free+Focus+Timer;🗺️+Learning+Roadmap+Tracker;📝+AI-Powered+Learning+Journal;🗂️+Project+Board+(Kanban);📚+Knowledge+Hub+%2B+Notes;📈+Real+Growth+Analytics;🤖+AI+Coach+That+Knows+Your+Progress" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-22c55e?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/Version-1.0.0-a78bfa?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-38bdf8?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-Welcome-f97316?style=for-the-badge" />
</p>

---

## 🧠 What Is Cresca?

> Most people who want to learn something new fail not because of lack of motivation — but because of **no focus**, **no structure**, and **no visibility into their own progress**.

**Cresca** is a personal learning operating system built for working professionals and self-taught learners who only have a few hours a day.

One focused space where everything lives together — your roadmap, your sessions, your notes, your project, your AI coach.

---

## ✨ Core Features

| Feature | Description |
|---|---|
| 🎯 **Focus Mode** | Distraction-free Pomodoro timer with live note-taking. Auto-logs study hours. |
| 🗺️ **Learning Roadmap** | 5 learning paths, 5 stages each. Mark topics as Learning or Confident. AI suggests what to study next. |
| 📝 **Learning Journal** | Auto-created after every session. Captures what you learned, what confused you, and your next step. |
| 🗂️ **Project Board** | Kanban board for your dream project. To Do → In Progress → Done. Linked to goals. |
| 📚 **Knowledge Hub** | Notion-style notes editor + resource library (links, videos, docs, books) per goal. |
| 📊 **Track Growth** | Real weekly/monthly analytics. Streaks, active days, hours per day chart. AI weekly report. |
| 🤖 **AI Coach** | Powered by Claude. Context-aware — knows your roadmap progress, real stats, and goals. |
| 👤 **Onboarding + Profile** | 4-step setup wizard. Daily study goal. Lifetime stats. |

---

## 🚀 Tech Stack

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
  <img src="https://img.shields.io/badge/Claude_AI-CC785C?style=for-the-badge&logo=anthropic&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white" />
</p>

---

## 🏗️ Architecture

```
cresca/
├── backend/                  # Node.js + Express API
│   ├── config/db.js          # Sequelize + PostgreSQL
│   ├── controllers/          # Business logic
│   ├── middleware/auth.js    # JWT authentication
│   ├── models/               # Sequelize models
│   ├── routes/               # API routes
│   └── server.js
│
└── frontend/                 # React application
    └── src/
        ├── api/axios.js      # Axios + auth interceptor
        ├── components/       # Shared components
        ├── context/          # Auth context
        └── pages/
            ├── Today.js        # Home dashboard
            ├── FocusMode.js    # Pomodoro timer
            ├── Roadmap.js      # Learning path tracker
            ├── ProjectBoard.js # Kanban board
            ├── KnowledgeHub.js # Notes + resources
            ├── Journal.js      # Learning journal
            ├── TrackGrowth.js  # Analytics
            └── Profile.js      # User settings
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL running locally
- Anthropic API key

### 1. Clone

```bash
git clone https://github.com/moreinn/cresca.git
cd cresca
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
DB_NAME=cresca
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_secret_key_here
OPENAI_API_KEY=your_anthropic_api_key
```

```bash
npm run dev
```

### 3. Frontend

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

Open `http://localhost:3000` — the onboarding wizard will guide you through setup.

---

## 🗺️ Learning Paths Available

```
🌐 Full Stack Web Development  →  HTML → React → Node.js → Deploy
📊 Data Science               →  Python → Pandas → ML → Deploy
🤖 AI / Machine Learning      →  Math → PyTorch → LLMs → Agents
⚙️ Backend Development        →  APIs → Databases → Docker → CI/CD
🎨 Frontend Development       →  CSS → React → TypeScript → Next.js
```

Each path has **5 stages** and **20–25 topics**. Topics are clickable — cycle through Not Started → Learning → Confident. AI reads your current progress and tells you exactly what to study next.

---

## 🌍 Deployment

| Layer | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Auto-deploys on push to main |
| Backend | Railway | Node.js service |
| Database | Railway PostgreSQL | DATABASE_URL auto-injected |

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

---

## 🐍 Contribution Snake

<p align="center">
  <img src="https://github.com/moreinn/moreinn/blob/output/github-contribution-grid-snake.svg" />
</p>

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=120&section=footer" />
</p>

<p align="center">
  <i>Built for people who are serious about growth but have limited time.</i><br/>
  <i>Every hour you study inside Cresca compounds.</i>
</p>
