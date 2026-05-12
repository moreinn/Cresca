import express from "express";
import { getAllProgress, updateTopicStatus } from "../controllers/roadmapController.js";

const router = express.Router();

router.get("/", getAllProgress);
router.post("/", updateTopicStatus);

export default router;