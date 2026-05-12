import TopicProgress from "../models/TopicProgress.js";

export const getAllProgress = async (req, res) => {
  try {
    const progress = await TopicProgress.findAll({
      where: { UserId: req.user.id },
    });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTopicStatus = async (req, res) => {
  try {
    const { topicKey, pathId, status } = req.body;
    const [record, created] = await TopicProgress.findOrCreate({
      where: { topicKey, UserId: req.user.id },
      defaults: { topicKey, pathId, status, UserId: req.user.id },
    });
    if (!created) await record.update({ status, pathId });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};