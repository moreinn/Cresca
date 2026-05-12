import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Note = sequelize.define("Note", {
  title: {
    type: DataTypes.STRING,
    defaultValue: "Untitled",
  },
  content: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
});

export default Note;