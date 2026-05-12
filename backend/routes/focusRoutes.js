import express from "express";
import { saveFocusSession, getFocusSessions } from "../controllers/focusController.js";

const router = express.Router();

router.post("/", saveFocusSession);
router.get("/", getFocusSessions);

export default router;