import express from "express";
import { createNote, getNotesByGoal, updateNote, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);
router.get("/:goalId", getNotesByGoal);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;