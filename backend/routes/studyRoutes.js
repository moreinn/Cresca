import express from "express";
import {
  addStudyLog,
  getStudyLogs,
  getWeeklyStats,
  getMonthlyStats,
} from "../controllers/studyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/weekly", protect, getWeeklyStats);
router.get("/monthly", protect, getMonthlyStats);
router.post("/", protect, addStudyLog);
router.get("/", protect, getStudyLogs);

export default router;
