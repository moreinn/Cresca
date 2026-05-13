import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const PATHS_QUICK = [
  { id: "fullstack", name: "Full Stack Dev", emoji: "🌐", desc: "HTML to SaaS" },
  { id: "datascience", name: "Data Science", emoji: "📊", desc: "Python to ML models" },
  { id: "aiml", name: "AI / ML", emoji: "🤖", desc: "Deep learning & LLMs" },
  { id: "backend", name: "Backend Dev", emoji: "⚙️", desc: "APIs & databases" },
  { id: "frontend", name: "Frontend Dev", emoji: "🎨", desc: "UI & React mastery" },
  { id: "other", name: "Custom Path", emoji: "✨", desc: "Define your own" },
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedPath, setSelectedPath] = useState("");
  const [goal, setGoal] = useState({ title: "", targetHours: "" });
  const [dailyGoal, setDailyGoal] = useState(2);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const TOTAL = 4;

  const next = () => setStep((s) => Math.min(s + 1, TOTAL));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const finish = async () => {
    setLoading(true);
    try {
      await API.put("/auth/profile", {
        name: name.trim(),
        dailyGoalHours: dailyGoal,
        onboardingComplete: true,
      });

      if (goal.title.trim()) {
        await API.post("/goals", {
          title: goal.title.trim(),
          targetHours: Number(goal.targetHours) || 20,
        });
      }

      if (selectedPath && selectedPath !== "other") {
        localStorage.setItem("selectedPath", selectedPath);
      }

      navigate("/today");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-10">

      {/* Step indicators */}
      <div className="flex gap-2 mb-12">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i + 1 <= step ? "w-10 bg-blue-500" : "w-4 bg-gray-800"
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-lg">

       
        {step === 1 && (
          <div className="text-center">
            <div className="text-7xl mb-6">👋</div>
            <h1 className="text-4xl font-bold mb-3">Welcome to Cresca</h1>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Your focused space to learn, build, and grow — without distractions.
            </p>
            <div className="text-left mb-8">
              <label className="text-sm text-gray-400 mb-2 block font-medium">
                What should we call you?
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && name.trim() && next()}
                autoFocus
                className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 text-xl"
              />
            </div>
            <button
              onClick={next}
              disabled={!name.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white py-4 rounded-xl font-bold text-lg transition-all"
            >
              Let's go →
            </button>
          </div>
        )}

       
        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold mb-2">What are you learning?</h2>
            <p className="text-gray-400 mb-8">
              We'll set up your personal roadmap.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {PATHS_QUICK.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPath(p.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedPath === p.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-800 bg-gray-900 hover:border-gray-600"
                  }`}
                >
                  <span className="text-3xl block mb-2">{p.emoji}</span>
                  <span className="font-bold text-sm block">{p.name}</span>
                  <span className="text-xs text-gray-500">{p.desc}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={back} className="px-5 py-3 rounded-xl bg-gray-900 text-gray-400 hover:text-white transition-all">
                ← Back
              </button>
              <button
                onClick={next}
                disabled={!selectedPath}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white py-3 rounded-xl font-bold transition-all"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

       
        {step === 3 && (
          <div>
            <h2 className="text-3xl font-bold mb-2">Set your first goal</h2>
            <p className="text-gray-400 mb-8">
              What's the one skill or project you most want to accomplish?
            </p>
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Goal</label>
                <input
                  type="text"
                  placeholder='e.g. "Learn React", "Build my SaaS MVP"'
                  value={goal.title}
                  onChange={(e) => setGoal({ ...goal, title: e.target.value })}
                  className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Target hours to complete this goal
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={goal.targetHours}
                  onChange={(e) => setGoal({ ...goal, targetHours: e.target.value })}
                  className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-3 block">
                  How much time can you study daily?{" "}
                  <span className="text-white font-bold">{dailyGoal}h/day</span>
                </label>
                <div className="flex gap-2">
                  {[0.5, 1, 1.5, 2, 3, 4].map((h) => (
                    <button
                      key={h}
                      onClick={() => setDailyGoal(h)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        dailyGoal === h
                          ? "bg-blue-600 text-white"
                          : "bg-gray-900 border border-gray-700 text-gray-400 hover:border-gray-500"
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Be realistic — consistency beats intensity every time.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={back} className="px-5 py-3 rounded-xl bg-gray-900 text-gray-400 hover:text-white transition-all">
                ← Back
              </button>
              <button
                onClick={next}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all"
              >
                {goal.title ? "Almost done →" : "Skip →"}
              </button>
            </div>
          </div>
        )}

      
        {step === 4 && (
          <div className="text-center">
            <div className="text-7xl mb-6">🚀</div>
            <h2 className="text-4xl font-bold mb-3">
              You're set, {name}!
            </h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Your focused learning space is ready. Every hour you put in here compounds.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-8 text-left flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🗺️</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Learning Path</p>
                  <p className="text-gray-400 text-xs capitalize">
                    {PATHS_QUICK.find(p => p.id === selectedPath)?.name || "Custom"}
                  </p>
                </div>
                <span className="text-green-500 text-lg">✓</span>
              </div>

              {goal.title && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">First Goal</p>
                    <p className="text-gray-400 text-xs">{goal.title}</p>
                  </div>
                  <span className="text-green-500 text-lg">✓</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Daily Target</p>
                  <p className="text-gray-400 text-xs">{dailyGoal} hours per day</p>
                </div>
                <span className="text-green-500 text-lg">✓</span>
              </div>
            </div>

            <button
              onClick={finish}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-xl transition-all"
            >
              {loading ? "Setting up your space..." : "Enter Cresca →"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Onboarding;