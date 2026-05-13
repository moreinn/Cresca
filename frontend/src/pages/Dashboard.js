import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import AiCoach from "../components/AiCoach";

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [formData, setFormData] = useState({ title: "", targetHours: "" });
  const [studyHours, setStudyHours] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const fetchGoals = async () => {
    try {
      const res = await API.get("/goals");
      setGoals(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchGoals(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStudyInput = (goalId, value) => {
    setStudyHours({ ...studyHours, [goalId]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/goals", {
        title: formData.title,
        targetHours: Number(formData.targetHours),
      });
      setFormData({ title: "", targetHours: "" });
      fetchGoals();
    } catch (err) { console.log(err); }
  };

  const addStudyLog = async (goalId) => {
    const hours = studyHours[goalId];
    if (!hours) return alert("Please select a study time");
    try {
      await API.post("/studylogs", { goalId, hours: Number(hours) });
      fetchGoals();
      setStudyHours({ ...studyHours, [goalId]: "" });
    } catch (err) { console.log(err); }
  };

  const deleteGoal = async (id) => {
    try {
      await API.delete(`/goals/${id}`);
      fetchGoals();
    } catch (err) { console.log(err); }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const avgProgress = goals.length > 0
    ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
    : 0;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all duration-300">

      {/* NAVBAR */}
<div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
  <h1 className="text-2xl font-bold">Cresca</h1>
  <div className="flex gap-2 flex-wrap justify-end">
    <button onClick={() => navigate("/today")} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium">
      ← Today
    </button>
    <button onClick={() => navigate("/knowledge")} className="px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold">
      📚 Knowledge
    </button>
    <button onClick={() => navigate("/growth")} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">
      📈 Growth
    </button>
    <button onClick={() => setDarkMode(!darkMode)} className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-sm">
      {darkMode ? "☀️" : "🌙"}
    </button>
    <button onClick={logout} className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm">
      Logout
    </button>
  </div>
</div>

        <div className="max-w-7xl mx-auto p-6">

          {/* HEADER */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-1">Dashboard</h2>
            <p className="text-gray-500 dark:text-gray-400">Focus on your goals. No distractions.</p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Goals</p>
              <p className="text-4xl font-bold">{goals.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Average Progress</p>
              <p className="text-4xl font-bold">{avgProgress}%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Completed</p>
              <p className="text-4xl font-bold">{goals.filter(g => g.progress >= 100).length}</p>
            </div>
          </div>

          {/* CREATE GOAL */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
            <h2 className="text-xl font-bold mb-4">Create New Goal</h2>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="title"
                placeholder="Goal title (e.g. Learn Node.js)"
                value={formData.title}
                onChange={handleChange}
                required
                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400"
              />
              <input
                type="number"
                name="targetHours"
                placeholder="Target hours (e.g. 50)"
                value={formData.targetHours}
                onChange={handleChange}
                required
                className="w-48 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
                Create Goal
              </button>
            </form>
          </div>

          {/* GOALS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {goals.length === 0 ? (
              <p className="text-gray-400">No goals yet. Create one above!</p>
            ) : (
              goals.map((goal) => (
                <div key={goal.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                  <h3 className="text-xl font-bold mb-1">{goal.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">Target: {goal.targetHours}h</p>

                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-1 overflow-hidden">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(goal.progress, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{Math.round(goal.progress)}% complete</p>

                  <select
                    value={studyHours[goal.id] || ""}
                    onChange={(e) => handleStudyInput(goal.id, e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white mb-3"
                  >
                    <option value="">Select Study Time</option>
                    <option value="0.17">10 Minutes</option>
                    <option value="0.33">20 Minutes</option>
                    <option value="0.5">30 Minutes</option>
                    <option value="0.75">45 Minutes</option>
                    <option value="1">1 Hour</option>
                    <option value="1.5">1.5 Hours</option>
                    <option value="2">2 Hours</option>
                    <option value="3">3 Hours</option>
                    <option value="4">4 Hours</option>
                  </select>

                  <div className="flex gap-2 mb-2">
                    <button onClick={() => addStudyLog(goal.id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm">
                      Log Study
                    </button>
                    <button onClick={() => deleteGoal(goal.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold text-sm">
                      Delete
                    </button>
                  </div>
                  <button
                    onClick={() => navigate("/knowledge")}
                    className="w-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 py-2 rounded-lg font-semibold text-sm"
                  >
                    📚 Open Knowledge Hub
                  </button>
                </div>
              ))
            )}
          </div>

          {/* AI COACH */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <AiCoach />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;