import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
 name:{
    type: DataTypes.STRING,
    allowNull: false,
 },
 email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
 },
 password:{
    type: DataTypes.STRING,
    allowNull: false,
 },

 dailyGoalHours: {
  type: DataTypes.FLOAT,
  defaultValue: 2,
},

onboardingComplete: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
},

});

export default User;
