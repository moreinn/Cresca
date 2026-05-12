import Goal from "../models/Goal.js";

export const createGoal = async (req, res) => {
  try {
    const { title, deadline, progress, targetHours } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    const goal = await Goal.create({
      title,
      deadline,
      progress,
      targetHours,
      userId: req.user.id,
    });
    res.status(201).json(goal);
  } catch (err) {
    console.error("Failed to create goal:", err);
    res.status(500).json({ error: "Failed to create goal" });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll({ where: { userId: req.user.id } });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!goal) return res.status(404).json({ error: "Goal not found" });

    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { title, deadline, progress, targetHours } = req.body;
    const goal = await Goal.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!goal) return res.status(404).json({ error: "Goal not found" });

    await goal.update({ title, deadline, progress, targetHours });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const deleted = await Goal.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!deleted) return res.status(404).json({ error: "Goal not found" });

    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
