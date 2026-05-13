import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Today = () => {
  const [goals, setGoals] = useState([]);
  const [todayHours, setTodayHours] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [recentJournal, setRecentJournal] = useState([]);
  const [profile, setProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, goalsRes, weeklyRes, monthlyRes, journalRes] =
          await Promise.all([
            API.get("/auth/profile"),
            API.get("/goals"),
            API.get("/studylogs/weekly"),
            API.get("/studylogs/monthly"),
            API.get("/journal"),
          ]);

        // Redirect to onboarding if not complete
        if (!profileRes.data.onboardingComplete) {
          navigate("/onboarding");
          return;
        }

        setProfile(profileRes.data);
        setGoals(goalsRes.data);
        setWeeklyData(weeklyRes.data);
        setMonthlyStats(monthlyRes.data);
        setRecentJournal(journalRes.data.slice(0, 3));
        const todayEntry = weeklyRes.data[weeklyRes.data.length - 1];
        setTodayHours(todayEntry?.hours || 0);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const activeGoals = goals.filter((g) => g.progress < 100);
  const moods = ["", "😴", "😐", "🙂", "😊", "🔥"];

  const dailyTarget = profile?.dailyGoalHours || 2;
  const dailyProgress = Math.min((todayHours / dailyTarget) * 100, 100);

  const navLinks = [
    { label: "Today", path: "/today" },
    { label: "Roadmap", path: "/roadmap" },
    { label: "Goals", path: "/dashboard" },
    { label: "Focus", path: "/focus" },
    { label: "Journal", path: "/journal" },
    { label: "Knowledge", path: "/knowledge" },
    { label: "Projects", path: "/projects" },
    { label: "Growth", path: "/growth" },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white transition-all">

  
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight">Cresca</h1>

          
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-all"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>

            
              <button
                onClick={() => navigate("/profile")}
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {profile?.name ? profile.name[0].toUpperCase() : "?"}
                </div>
                <span className="text-gray-700 dark:text-gray-200 max-w-20 truncate">
                  {profile?.name || "Profile"}
                </span>
              </button>

           
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <div className="flex flex-col gap-1.5 w-5">
                  <div className={`h-0.5 bg-gray-600 dark:bg-gray-300 rounded transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                  <div className={`h-0.5 bg-gray-600 dark:bg-gray-300 rounded transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
                  <div className={`h-0.5 bg-gray-600 dark:bg-gray-300 rounded transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </div>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden pt-4 pb-2 flex flex-col gap-1 border-t border-gray-100 dark:border-gray-800 mt-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => { navigate(link.path); setMobileMenuOpen(false); }}
                  className="text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-all"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }}
                className="text-left px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-all"
              >
                👤 Profile
              </button>
              <button
                onClick={logout}
                className="text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 text-sm font-medium transition-all"
              >
                Log Out
              </button>
            </div>
          )}
        </div>

        <div className="max-w-5xl mx-auto p-6">

      
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-1">
              {greeting}{profile?.name ? `, ${profile.name}` : ""} 👋
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {todayHours > 0
                ? `You've studied ${todayHours}h today. Keep the momentum.`
                : "You haven't studied yet today. Your future self is waiting."}
            </p>
          </div>

         
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">
                Daily Goal — {todayHours}h / {dailyTarget}h
              </span>
              <span className={`text-sm font-bold ${dailyProgress >= 100 ? "text-green-500" : "text-blue-600"}`}>
                {dailyProgress >= 100 ? "✅ Goal Reached!" : `${Math.round(dailyProgress)}%`}
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-700 ${
                  dailyProgress >= 100 ? "bg-green-500" : "bg-blue-600"
                }`}
                style={{ width: `${dailyProgress}%` }}
              />
            </div>
          </div>

         
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Today", value: `${todayHours}h`, color: "text-blue-600" },
              { label: "Streak", value: `${monthlyStats?.streak || 0} 🔥`, color: "text-orange-500" },
              { label: "This Month", value: `${monthlyStats?.totalHours || 0}h`, color: "text-green-500" },
              { label: "Active Goals", value: activeGoals.length, color: "text-purple-500" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl"
              >
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

         
            <div className="lg:col-span-2 flex flex-col gap-6">

              
              <div className="bg-blue-600 p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-1">Start a Focus Session</h3>
                <p className="text-blue-200 text-sm mb-5">
                  Pick a goal, set a timer, go deep. No distractions.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => navigate("/focus")}
                    className="bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all text-sm"
                  >
                    🎯 Start Focus →
                  </button>
                  <button
                    onClick={() => navigate("/roadmap")}
                    className="bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl hover:bg-blue-800 transition-all text-sm"
                  >
                    🗺️ View Roadmap
                  </button>
                </div>
              </div>

        
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Active Goals</h3>
                  <button onClick={() => navigate("/dashboard")} className="text-blue-500 text-sm">
                    Manage →
                  </button>
                </div>
                {activeGoals.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-400 text-sm">No active goals.</p>
                    <button onClick={() => navigate("/dashboard")} className="mt-2 text-blue-500 text-sm underline">
                      Create your first goal
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {activeGoals.map((goal) => (
                      <div key={goal.id} className="flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate text-sm">{goal.title}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full transition-all"
                                style={{ width: `${Math.min(goal.progress, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                              {Math.round(goal.progress)}%
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate("/focus")}
                          className="text-xs bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold whitespace-nowrap"
                        >
                          Focus →
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

             
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Recent Journal</h3>
                  <button onClick={() => navigate("/journal")} className="text-blue-500 text-sm">
                    View all →
                  </button>
                </div>
                {recentJournal.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-400 text-sm">No entries yet.</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Complete a focus session to create your first journal entry.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {recentJournal.map((entry) => (
                      <div
                        key={entry.id}
                        onClick={() => navigate("/journal")}
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            {new Date(entry.createdAt).toLocaleDateString("en-US", {
                              weekday: "short", month: "short", day: "numeric",
                            })}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{moods[entry.mood] || ""}</span>
                            <span className="text-xs text-gray-400">{entry.sessionDuration}min</span>
                          </div>
                        </div>
                        {entry.learned && (
                          <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                            <span className="font-semibold text-green-600 dark:text-green-400">Learned: </span>
                            {entry.learned}
                          </p>
                        )}
                        {entry.nextStep && (
                          <p className="text-sm text-blue-500 truncate mt-0.5">
                            <span className="font-semibold">Next: </span>
                            {entry.nextStep}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="flex flex-col gap-6">

          
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
                <h3 className="font-bold mb-4">This Week</h3>
                <div className="flex flex-col gap-3">
                  {weeklyData.map((d) => (
                    <div key={d.date} className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-7 font-medium">{d.day}</span>
                      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            d.hours >= dailyTarget
                              ? "bg-green-500"
                              : d.hours > 0
                              ? "bg-blue-500"
                              : ""
                          }`}
                          style={{
                            width: d.hours > 0 ? `${Math.min((d.hours / dailyTarget) * 100, 100)}%` : "0%",
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-8 text-right">
                        {d.hours > 0 ? `${d.hours}h` : "—"}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  🟢 = reached {dailyTarget}h goal
                </p>
              </div>

          
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Quick Access</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "🎯 Focus Session", path: "/focus" },
                    { label: "🗺️ Learning Roadmap", path: "/roadmap" },
                    { label: "🗂️ Project Board", path: "/projects" },
                    { label: "📝 Learning Journal", path: "/journal" },
                    { label: "📚 Knowledge Hub", path: "/knowledge" },
                    { label: "📈 Track Growth", path: "/growth" },
                    { label: "👤 Profile", path: "/profile" },
                  ].map((item) => (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className="text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium transition-all"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;