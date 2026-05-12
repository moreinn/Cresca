import StudyLog from "../models/StudyLog.js";
import Goal from "../models/Goal.js";
import { Op, fn, col } from "sequelize";

export const addStudyLog = async (req, res) => {
  try {
    const { goalId, hours } = req.body;
    const newLog = await StudyLog.create({
      hours,
      GoalId: goalId,
      UserId: req.user.id,
    });

    // Update goal progress
    const goal = await Goal.findOne({ where: { id: goalId, UserId: req.user.id } });
    if (goal && goal.targetHours) {
      const allLogs = await StudyLog.findAll({ where: { GoalId: goalId } });
      const totalHours = allLogs.reduce((sum, l) => sum + l.hours, 0);
      const progress = Math.min((totalHours / goal.targetHours) * 100, 100);
      await goal.update({ progress });
    }

    res.status(201).json(newLog);
  } catch (err) {
    console.error("Failed to add study log:", err);
    res.status(500).json({ error: "Failed to add study log" });
  }
};

export const getStudyLogs = async (req, res) => {
  try {
    const logs = await StudyLog.findAll({ where: { UserId: req.user.id } });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWeeklyStats = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const logs = await StudyLog.findAll({
      where: {
        UserId: req.user.id,
        createdAt: { [Op.gte]: sevenDaysAgo },
      },
      attributes: [
        [fn("DATE", col("createdAt")), "date"],
        [fn("SUM", col("hours")), "totalHours"],
      ],
      group: [fn("DATE", col("createdAt"))],
      order: [[fn("DATE", col("createdAt")), "ASC"]],
    });

    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const log = logs.find((l) => l.dataValues.date === dateStr);
      days.push({
        day: dayName,
        date: dateStr,
        hours: log ? parseFloat(parseFloat(log.dataValues.totalHours).toFixed(1)) : 0,
      });
    }
    res.json(days);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMonthlyStats = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const logs = await StudyLog.findAll({
      where: { UserId: req.user.id, createdAt: { [Op.gte]: thirtyDaysAgo } },
    });

    const totalHours = parseFloat(logs.reduce((sum, l) => sum + l.hours, 0).toFixed(1));
    const byDate = {};
    logs.forEach((log) => {
      const date = new Date(log.createdAt).toISOString().split("T")[0];
      byDate[date] = (byDate[date] || 0) + log.hours;
    });

    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      if (byDate[dateStr]) { streak++; }
      else if (i === 0) { continue; }
      else { break; }
    }

    res.json({
      totalHours,
      streak,
      avgDaily: parseFloat((totalHours / 30).toFixed(1)),
      activeDays: Object.keys(byDate).length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};