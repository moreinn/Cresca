import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import "./models/index.js"; 
import goalRoutes from "./routes/goalRoutes.js";
import studyRoutes from "./routes/studyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import Goal from "./models/Goal.js";
import Note from "./models/Note.js";
import focusRoutes from "./routes/focusRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import FocusSession from "./models/FocusSession.js";
import JournalEntry from "./models/JournalEntry.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import authenticate from "./middleware/auth.js";
import taskRoutes from "./routes/taskRoutes.js";
import Task from "./models/Task.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

Goal.hasMany(Note);
Note.belongsTo(Goal);
Goal.hasMany(FocusSession);
FocusSession.belongsTo(Goal);

Goal.hasMany(JournalEntry);
JournalEntry.belongsTo(Goal);

app.use(cors({
  origin: [
    "http://localhost:3000",
    process.env.FRONTEND_URL, 
  ],
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/goals", authenticate, goalRoutes);
app.use("/api/studylogs", authenticate, studyRoutes);
app.use("/api/notes", authenticate, noteRoutes);
app.use("/api/resources", authenticate, resourceRoutes);
app.use("/api/roadmap", authenticate, roadmapRoutes);
app.use("/api/journal", authenticate, journalRoutes);
app.use("/api/focus", authenticate, focusRoutes);
app.use("/api/tasks", authenticate, taskRoutes);
app.use("/api/ai", authenticate, aiRoutes);

app.get("/", (req, res) => {
  res.send("Cresca API Running 🚀");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");

    await sequelize.sync({ alter: true });
    console.log("Tables synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`); 
    });
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

start();
