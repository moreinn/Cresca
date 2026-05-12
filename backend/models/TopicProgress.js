import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TopicProgress = sequelize.define("TopicProgress", {
  topicKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pathId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "not_started", 
  },
});

export default TopicProgress;