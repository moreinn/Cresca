import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const JournalEntry = sequelize.define("JournalEntry", {
  learned: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  confusing: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  nextStep: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  mood: {
    type: DataTypes.INTEGER,
    defaultValue: 3, 
  },
  sessionDuration: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default JournalEntry;