# 🌳 SkillTree — Gamified Learning Roadmaps

> Turn learning into a video-game-style skill tree. Unlock nodes, earn XP, complete quizzes, play mini-games, and build real projects — all in one platform.

![SkillTree Banner](https://via.placeholder.com/1200x400/7c3aed/ffffff?text=SkillTree)

## 🎬 Live Demo

- **Frontend:** [https://skilltree-yourname.vercel.app](https://skilltree-yourname.vercel.app)
- **Backend API:** [https://skilltree-api.onrender.com](https://skilltree-api.onrender.com)

> ⚠️ Update these URLs after deployment.

## 📸 Screenshots

| Skill Tree | Node Modal | Analytics |
|---|---|---|
| ![Tree](https://via.placeholder.com/300x200/7c3aed/ffffff?text=Skill+Tree) | ![Node](https://via.placeholder.com/300x200/ec4899/ffffff?text=Node+Modal) | ![Analytics](https://via.placeholder.com/300x200/22c55e/ffffff?text=Analytics) |

> Replace these with real screenshots after building. Drag & drop images into the GitHub editor to upload them.

## ✨ Features

- 🔐 **JWT Authentication** — signup, login, secure routes
- 🌳 **5 Interactive Skill Trees** — Web Dev, DSA, Python, ML, DevOps
- 📚 **Rich Learning Content** — notes, code samples, resources per node
- 🧠 **Flashcards** — spaced-repetition style memory training
- ✅ **Multi-question Quizzes** — with detailed explanations
- 💻 **Live Code Playground** — write HTML/CSS/JS, see it run instantly
- 🎮 **3 Mini-games** — Typing Sprint, Memory Match, Quiz Rush
- 🤖 **AI Mentor** — powered by Google Gemini (free API)
- 🎯 **Daily Coding Challenge** — global daily puzzle
- 🏆 **Achievements System** — common, rare, epic, legendary badges
- 📅 **Streak Tracking** — GitHub-style 90-day heatmap
- 🎓 **Certificate Generator** — download when you complete a tree
- 📊 **Analytics Dashboard** — XP chart, streaks, progress
- 💬 **Comments per Node** — discuss with other learners
- 📤 **Project Submissions** — peer-reviewed boss node projects
- 🔍 **Global Search** — find any skill across all trees
- 🎨 **Light/Dark Theme** toggle
- 🔊 **Voice Narration** of notes (Web Speech API)

## 🧱 Tech Stack

| Layer | Tech |
|---|---|
| **Frontend** | React 18, Vite, React Flow, Tailwind CSS, React Router |
| **Backend** | Node.js, Express, JWT, bcrypt |
| **Database** | MongoDB (Mongoose) |
| **APIs** | Google Gemini (AI Mentor), Web Speech API (narration) |
| **Deploy** | Vercel (frontend), Render (backend), MongoDB Atlas (DB) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Git

### 1. Clone the repo

```bash
git clone https://github.com/chandraveerkumar500-spec/skilltree.git
cd skilltree
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env and set MONGO_URI + JWT_SECRET
npm run dev
```

Backend runs on **http://localhost:5000**

### 3. Setup Frontend (in a new terminal)

```bash
cd client
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

### 4. Environment Variables

**`server/.env`**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/skilltree
JWT_SECRET=your_secret_here
GEMINI_API_KEY=your_optional_gemini_key
```

**`client/.env`**
```
VITE_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
skilltree/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # Axios config
│   │   ├── components/    # Reusable UI (Navbar, NodeModal, games…)
│   │   ├── context/       # AuthContext (user, theme, toast)
│   │   ├── data/          # Tree definitions, achievements
│   │   └── pages/         # Route pages (Dashboard, Profile…)
│   └── ...
└── server/                # Express backend
    ├── middleware/       # Auth + admin middlewares
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    └── server.js
```

## 🎯 How It Works

1. **Sign up** — JWT token stored in localStorage
2. **Pick a tree** — Web Dev, DSA, Python, ML, or DevOps
3. **Click a node** — Opens a modal with tabs: Notes, Flashcards, Quiz, Playground, Challenge, Game, AI, Discuss
4. **Complete requirements** — Pass the quiz (80%+) and win the game
5. **Unlock next nodes** — The graph lights up as you progress
6. **Earn XP and badges** — Level up, track streaks, unlock achievements
7. **Finish a tree** — Download a completion certificate 🎓

## 🧪 Testing

```bash
# Backend tests (add later)
cd server && npm test

# Frontend build check
cd client && npm run build
```

## 📝 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/progress/complete` | Mark node complete |
| GET | `/api/progress/leaderboard` | Top 10 users |
| GET | `/api/progress/analytics` | User XP history |
| POST | `/api/ai/ask` | Ask AI mentor |
| GET | `/api/comments/:treeId/:nodeId` | Comments on node |
| POST | `/api/submissions` | Submit boss project |

## 🗺️ Roadmap

- [x] Multi-tree architecture
- [x] Interactive React Flow graph
- [x] AI mentor integration
- [x] Mini-games (typing, memory, quiz rush)
- [ ] Real-time collaborative study rooms (Socket.io)
- [ ] Mobile app (React Native)
- [ ] Voice-guided lessons

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

MIT License — see [LICENSE](./LICENSE) file.

## 👤 Author

**[CHANDRAVEER KUMAR]**
- GitHub: [https://github.com/chandraveerkumar500-spec](https://github.com/your-username)
- LinkedIn: [https://www.linkedin.com/in/chandraveer-kumar?utm_source=share_via&utm_content=profile&utm_medium=member_android](https://linkedin.com/in/your-profile)
- Email: chandraveerkumar500@gmail.com

**B.Tech Computer Science** — [Your College Name], [Year]

## 🙏 Acknowledgements

- [React Flow](https://reactflow.dev/) — for the beautiful node graph
- [Tailwind CSS](https://tailwindcss.com/) — for the styling system
- [Google Gemini](https://ai.google.dev/) — for AI mentor
- [Vercel](https://vercel.com/) & [Render](https://render.com/) — free hosting

---

⭐ **If you find this project useful, please give it a star!** ⭐