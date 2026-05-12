import Note from "../models/Note.js";
import Goal from "../models/Goal.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, GoalId } = req.body;
    
    const goal = await Goal.findOne({ where: { id: GoalId, UserId: req.user.id } });
    if (!goal) return res.status(403).json({ error: "Goal not found" });
    const note = await Note.create({ title, content, GoalId });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNotesByGoal = async (req, res) => {
  try {
   
    const goal = await Goal.findOne({ where: { id: req.params.goalId, UserId: req.user.id } });
    if (!goal) return res.status(403).json({ error: "Goal not found" });
    const notes = await Note.findAll({
      where: { GoalId: req.params.goalId },
      order: [["updatedAt", "DESC"]],
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    await Note.update({ title, content }, { where: { id: req.params.id } });
    res.json({ message: "Note updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await Note.destroy({ where: { id: req.params.id } });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};