import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

const TrackGrowth = () => {
  const [goals, setGoals] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [weeklyReport, setWeeklyReport] = useState("");
const [generatingReport, setGeneratingReport] = useState(false);
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [goalsRes, weeklyRes, monthlyRes] = await Promise.all([
          API.get("/goals"),
          API.get("/studylogs/weekly"),
          API.get("/studylogs/monthly"),
        ]);
        setGoals(goalsRes.data);
        setWeeklyData(weeklyRes.data);
        setMonthlyStats(monthlyRes.data);
      } catch (err) { console.log(err); }
    };
    fetchAll();
  }, []);


  const axisColor = darkMode ? "#9ca3af" : "#374151";
  const avgProgress = goals.length > 0
    ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
    : 0;

    const generateWeeklyReport = async () => {
  setGeneratingReport(true);
  setWeeklyReport("");
  try {
    const studiedDays = weeklyData.filter((d) => d.hours > 0);
    const bestDay = weeklyData.reduce((best, d) => (d.hours > best.hours ? d : best), { hours: 0 });
    const weekTotal = weeklyData.reduce((sum, d) => sum + d.hours, 0).toFixed(1);

    const prompt = `Give me a personalized weekly learning report based on this data:

This week: ${weekTotal} hours studied across ${studiedDays.length} days.
Best day: ${bestDay.day} with ${bestDay.hours}h.
Current streak: ${monthlyStats?.streak || 0} days.
Monthly total: ${monthlyStats?.totalHours || 0} hours.
Active goals: ${goals.filter(g => g.progress < 100).length}.
Completed goals: ${goals.filter(g => g.progress >= 100).length}.

Write a motivating, personal 4-5 sentence weekly report. Mention the numbers. Highlight what went well. Give one specific, actionable suggestion for next week. Sound like a mentor, not a robot.`;

    const res = await API.post("/ai/coach", { message: prompt });
    setWeeklyReport(res.data.reply);
  } catch (err) {
    console.log(err);
  }
  setGeneratingReport(false);
};
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
    
<div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
  <div className="flex justify-between items-center mb-2">
    <div>
      <h3 className="text-xl font-bold">Weekly AI Report</h3>
      <p className="text-gray-400 text-sm">Get a personal summary of your week</p>
    </div>
    <button
      onClick={generateWeeklyReport}
      disabled={generatingReport}
      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap"
    >
      {generatingReport ? "Generating..." : "🤖 Generate Report"}
    </button>
  </div>

  {weeklyReport && (
    <div className="mt-4 p-5 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-2xl">
      <p className="text-sm font-bold text-blue-500 uppercase tracking-wide mb-3">
        Your Weekly Summary
      </p>
      <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
        {weeklyReport}
      </p>
    </div>
  )}
</div>

       
        <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
          <h1 className="text-2xl font-bold">📈 Track Growth</h1>
          <button onClick={() => navigate("/dashboard")} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm">
            ← Dashboard
          </button>
        </div>

        <div className="max-w-6xl mx-auto p-6">

          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-1">Your Growth</h2>
            <p className="text-gray-500 dark:text-gray-400">Every hour you study compounds over time.</p>
          </div>

      
          {monthlyStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Last 30 Days</p>
                <p className="text-4xl font-bold text-blue-600">{monthlyStats.totalHours}h</p>
                <p className="text-xs text-gray-400 mt-1">total studied</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Current Streak</p>
                <p className="text-4xl font-bold text-orange-500">{monthlyStats.streak} 🔥</p>
                <p className="text-xs text-gray-400 mt-1">days in a row</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Daily Average</p>
                <p className="text-4xl font-bold text-purple-500">{monthlyStats.avgDaily}h</p>
                <p className="text-xs text-gray-400 mt-1">per day</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Active Days</p>
                <p className="text-4xl font-bold text-green-500">{monthlyStats.activeDays}</p>
                <p className="text-xs text-gray-400 mt-1">of last 30 days</p>
              </div>
            </div>
          )}

        
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
            <h3 className="text-xl font-bold mb-2">This Week</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Hours studied per day</p>
            {weeklyData.length === 0 ? (
              <p className="text-gray-400">No study sessions yet.</p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="day" stroke={axisColor} />
                    <YAxis stroke={axisColor} unit="h" />
                    <Tooltip formatter={(val) => [`${val}h`, "Studied"]} />
                    <Bar dataKey="hours" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-7 gap-2 mt-6">
                  {weeklyData.map((d) => (
                    <div key={d.date} className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{d.day}</p>
                      <div className={`py-3 rounded-xl text-sm font-bold ${
                        d.hours >= 2
                          ? "bg-blue-600 text-white"
                          : d.hours > 0
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                      }`}>
                        {d.hours > 0 ? `${d.hours}h` : "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-6">Goal Progress</h3>
            {goals.length === 0 ? (
              <p className="text-gray-400">No goals yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-semibold">Goal</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-semibold">Target</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-semibold">Progress</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goals.map((goal) => (
                      <tr key={goal.id} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-4 font-semibold">{goal.title}</td>
                        <td className="py-4 text-gray-500 dark:text-gray-400">{goal.targetHours}h</td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-28 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${Math.min(goal.progress, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">{Math.round(goal.progress)}%</span>
                          </div>
                        </td>
                        <td className="py-4">
                          {goal.progress >= 100 ? (
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">✅ Done</span>
                          ) : goal.progress > 0 ? (
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">🔄 Active</span>
                          ) : (
                            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">⏳ Not Started</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrackGrowth;