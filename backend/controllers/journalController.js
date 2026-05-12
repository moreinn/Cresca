import JournalEntry from "../models/JournalEntry.js";

export const createJournalEntry = async (req, res) => {
  try {
    const { GoalId, learned, confusing, nextStep, mood, sessionDuration } = req.body;
    const entry = await JournalEntry.create({
      GoalId, learned, confusing, nextStep, mood, sessionDuration,
      UserId: req.user.id,
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllJournalEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getJournalByGoal = async (req, res) => {
  try {
    const entries = await JournalEntry.findAll({
      where: { GoalId: req.params.goalId, UserId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};