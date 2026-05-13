import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", dailyGoalHours: 2 });
  const [stats, setMonthly] = useState(null);
  const [goals, setGoals] = useState([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [saved, setSaved] = useState(false);
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, monthlyRes, goalsRes, focusRes] = await Promise.all([
          API.get("/auth/profile"),
          API.get("/studylogs/monthly"),
          API.get("/goals"),
          API.get("/focus"),
        ]);
        setProfile(profileRes.data);
        setMonthly(monthlyRes.data);
        setGoals(goalsRes.data);
        setTotalSessions(focusRes.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, []);

  const saveProfile = async () => {
    try {
      await API.put("/auth/profile", {
        name: profile.name,
        dailyGoalHours: profile.dailyGoalHours,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const completedGoals = goals.filter((g) => g.progress >= 100).length;
  const totalHours = parseFloat(
    goals.reduce((sum, g) => sum + (g.targetHours || 0), 0).toFixed(1)
  );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white">

        <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold">👤 Profile</h1>
          <button
            onClick={() => navigate("/today")}
            className="text-sm text-gray-500 hover:text-black dark:hover:text-white"
          >
            ← Today
          </button>
        </div>

        <div className="max-w-xl mx-auto p-6 flex flex-col gap-6">

       
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl text-center">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-3">
              {profile.name ? profile.name[0].toUpperCase() : "?"}
            </div>
            <h2 className="text-2xl font-bold">{profile.name || "Your Name"}</h2>
            <p className="text-gray-400 text-sm">{profile.email}</p>
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "This Month", value: `${stats?.totalHours || 0}h`, color: "text-blue-600", sub: "studied" },
              { label: "Streak", value: `${stats?.streak || 0} 🔥`, color: "text-orange-500", sub: "days in a row" },
              { label: "Goals Done", value: completedGoals, color: "text-green-500", sub: `of ${goals.length} total` },
              { label: "Sessions", value: totalSessions, color: "text-purple-500", sub: "focus sessions" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl"
              >
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* EDIT PROFILE */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-4">Personal Info</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Name</label>
                <input
                  type="text"
                  value={profile.name || ""}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 block">Email</label>
                <input
                  type="email"
                  value={profile.email || ""}
                  disabled
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* STUDY SETTINGS */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-1">Study Settings</h3>
            <p className="text-gray-400 text-sm mb-5">How many hours do you want to study each day?</p>
            <div className="flex gap-2">
              {[0.5, 1, 1.5, 2, 3, 4].map((h) => (
                <button
                  key={h}
                  onClick={() => setProfile({ ...profile, dailyGoalHours: h })}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                    profile.dailyGoalHours === h
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {h}h
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Current target: <span className="font-bold text-black dark:text-white">{profile.dailyGoalHours} hours/day</span>
            </p>
          </div>

          {/* SAVE */}
          <button
            onClick={saveProfile}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              saved
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {saved ? "✓ Changes Saved!" : "Save Profile"}
          </button>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="w-full py-3 rounded-xl font-semibold text-red-500 border-2 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
          >
            Log Out
          </button>

        </div>
      </div>
    </div>
  );
};

export default Profile;