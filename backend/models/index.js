import User from "./User.js";
import Goal from "./Goal.js";
import StudyLog from "./StudyLog.js";

User.hasMany(Goal, { foreignKey: "userId" });
Goal.belongsTo(User, { foreignKey: "userId" });

Goal.hasMany(StudyLog, { foreignKey: "goalId" });
StudyLog.belongsTo(Goal, { foreignKey: "goalId" });

export { User, Goal, StudyLog };