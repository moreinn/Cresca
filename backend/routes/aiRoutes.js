import express from "express";
import { askAI } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/coach", protect, askAI);

export default router;