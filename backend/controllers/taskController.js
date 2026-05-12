import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, GoalId } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    const task = await Task.create({
      title,
      description,
      priority: priority || "medium",
      status: status || "todo",
      GoalId: GoalId || null,
      UserId: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    console.error("Failed to create task:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    await Task.update(
      { title, description, priority, status },
      { where: { id: req.params.id, UserId: req.user.id } }
    );
    const updated = await Task.findByPk(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.id, UserId: req.user.id } });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};