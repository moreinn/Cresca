import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const FocusSession = sequelize.define("FocusSession", {
  duration: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  actualDuration: {
    type: DataTypes.INTEGER, 
    defaultValue: 0,
  },
  notes: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
});

export default FocusSession;