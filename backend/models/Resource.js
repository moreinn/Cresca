import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Resource = sequelize.define("Resource", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: "link", 
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

export default Resource;