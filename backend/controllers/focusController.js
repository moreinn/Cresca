import FocusSession from "../models/FocusSession.js";

export const saveFocusSession = async (req, res) => {
  try {
    const { GoalId, duration, actualDuration, notes } = req.body;
    const session = await FocusSession.create({
      GoalId, duration, actualDuration, notes,
      UserId: req.user.id,
    });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFocusSessions = async (req, res) => {
  try {
    const sessions = await FocusSession.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};