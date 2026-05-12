import express from "express";
import {
  createJournalEntry,
  getAllJournalEntries,
  getJournalByGoal,
} from "../controllers/journalController.js";

const router = express.Router();

router.post("/", createJournalEntry);
router.get("/", getAllJournalEntries);
router.get("/:goalId", getJournalByGoal);

export default router;