import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const StudyLog = sequelize.define("StudyLog", {
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hours: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  goalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default StudyLog;