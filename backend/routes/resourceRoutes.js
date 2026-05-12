import express from "express";
import {
  addResource,
  getResourcesByGoal,
  deleteResource,
} from "../controllers/resourceController.js";

const router = express.Router();

router.post("/", addResource);
router.get("/:goalId", getResourcesByGoal);
router.delete("/:id", deleteResource);

export default router;