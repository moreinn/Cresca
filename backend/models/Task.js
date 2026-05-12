import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  priority: {
    type: DataTypes.STRING,
    defaultValue: "medium", 
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "todo",
    validate: {
      isIn: [["todo", "inprogress", "done"]],
    },
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  GoalId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Task;
