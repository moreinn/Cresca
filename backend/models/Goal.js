import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Goal = sequelize.define("Goal", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  targetHours: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1,
  },

  progress: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Goal;