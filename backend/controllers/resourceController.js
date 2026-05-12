import Resource from "../models/Resource.js";

export const addResource = async (req, res) => {
  try {
    const { title, link, type, notes, GoalId } = req.body;

    if (!title || !link || !GoalId) {
      return res.status(400).json({ error: "Title, link and GoalId are required" });
    }

    const resource = await Resource.create({ title, link, type, notes, GoalId });
    res.status(201).json(resource);
  } catch (err) {
    console.error("Failed to add resource:", err);
    res.status(500).json({ error: "Failed to add resource" });
  }
};

export const getResourcesByGoal = async (req, res) => {
  try {
    const resources = await Resource.findAll({
      where: { GoalId: req.params.goalId },
    });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    await Resource.destroy({ where: { id: req.params.id } });
    res.json({ message: "Resource deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};