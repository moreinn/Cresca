import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const JournalPrompt = ({ goal, elapsed, navigate }) => {
  const [form, setForm] = useState({
    learned: "",
    confusing: "",
    nextStep: "",
    mood: 4,
  });
  const [saved, setSaved] = useState(false);
  const actualMinutes = Math.max(1, Math.round(elapsed / 60));
  const moods = ["😴", "😐", "🙂", "😊", "🔥"];

  const saveJournal = async () => {
    try {
      await API.post("/journal", {
        GoalId: goal?.id,
        learned: form.learned,
        confusing: form.confusing,
        nextStep: form.nextStep,
        mood: form.mood,
        sessionDuration: actualMinutes,
      });
      setSaved(true);
      setTimeout(() => navigate("/today"), 1500);
    } catch (err) {
      console.log(err);
    }
  };

  if (saved) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">✅</p>
          <h2 className="text-2xl font-bold mb-2">Saved!</h2>
          <p className="text-gray-400">Going back to Today...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        <div className="text-center mb-8">
          <p className="text-6xl mb-4">🎯</p>
          <h2 className="text-3xl font-bold mb-2">Session Complete!</h2>
          <p className="text-gray-400">
            You focused for{" "}
            <span className="text-blue-400 font-bold">{actualMinutes} minutes</span>
            {goal && (
              <>
                {" "}on <span className="text-white font-semibold">{goal.title}</span>
              </>
            )}
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-5">
          <h3 className="font-bold text-lg">Quick Reflection</h3>
          <p className="text-gray-400 text-sm -mt-3">
            2 minutes. This builds your learning journal.
          </p>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">✅ What did you learn?</label>
            <textarea
              rows="2"
              placeholder="Key concept, insight, or skill you picked up..."
              value={form.learned}
              onChange={(e) => setForm({ ...form, learned: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">🤔 What was confusing or hard?</label>
            <textarea
              rows="2"
              placeholder="Something to revisit or ask AI about..."
              value={form.confusing}
              onChange={(e) => setForm({ ...form, confusing: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">→ Next step for next session</label>
            <input
              type="text"
              placeholder="What will you work on next time?"
              value={form.nextStep}
              onChange={(e) => setForm({ ...form, nextStep: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-3 block">How was your focus?</label>
            <div className="flex gap-3">
              {moods.map((mood, i) => (
                <button
                  key={i}
                  onClick={() => setForm({ ...form, mood: i + 1 })}
                  className={`text-2xl p-2 rounded-xl transition-all flex-1 ${
                    form.mood === i + 1
                      ? "bg-blue-600 scale-110"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={saveJournal}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all"
            >
              Save Journal Entry
            </button>
            <button
              onClick={() => navigate("/today")}
              className="px-5 py-3 rounded-xl bg-gray-800 text-gray-400 hover:text-white transition-all text-sm"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const FocusMode = () => {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [duration, setDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionNotes, setSessionNotes] = useState("");
  const [phase, setPhase] = useState("setup"); // setup | focus | completed
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await API.get("/goals");
        setGoals(res.data);
        if (res.data.length > 0) setSelectedGoal(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGoals();
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startSession = () => {
    setTimeLeft(duration * 60);
    setElapsed(0);
    setPhase("focus");
    setIsRunning(true);
  };

  const pauseResume = () => setIsRunning((prev) => !prev);

  const endEarly = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    handleComplete();
  };

  const handleComplete = async () => {
    setPhase("completed");
    try {
      const actualMinutes = Math.max(1, Math.round(elapsed / 60));
      const hours = parseFloat((elapsed / 3600).toFixed(2));
      await Promise.all([
        API.post("/focus", {
          GoalId: selectedGoal?.id,
          duration,
          actualDuration: actualMinutes,
          notes: sessionNotes,
        }),
        hours > 0 &&
          API.post("/studylogs", {
            goalId: selectedGoal?.id,
            hours,
          }),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const totalSecs = duration * 60;
  const progress = totalSecs > 0 ? ((totalSecs - timeLeft) / totalSecs) * 100 : 0;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;

  
  if (phase === "setup") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 opacity-60 hover:opacity-100 transition-all">
          <button
            onClick={() => navigate("/today")}
            className="text-gray-400 hover:text-white text-sm"
          >
            ← Back
          </button>
          <span className="text-gray-400 text-sm">Focus Session</span>
          <div />
        </div>

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-center mb-2">Ready to focus?</h2>
            <p className="text-gray-400 text-center mb-10">
              Set your session and go deep.
            </p>

            
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-2 block font-medium">
                What are you working on?
              </label>
              {goals.length === 0 ? (
                <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
                  <p className="text-gray-400 text-sm">No goals yet.</p>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="text-blue-400 text-sm underline mt-1"
                  >
                    Create a goal first
                  </button>
                </div>
              ) : (
                <select
                  value={selectedGoal?.id || ""}
                  onChange={(e) =>
                    setSelectedGoal(goals.find((g) => g.id === Number(e.target.value)))
                  }
                  className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                >
                  {goals.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.title} — {Math.round(g.progress)}%
                    </option>
                  ))}
                </select>
              )}
            </div>

           
            <div className="mb-8">
              <label className="text-sm text-gray-400 mb-3 block font-medium">
                Session length
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[25, 45, 60, 90].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                      duration === d
                        ? "bg-blue-600 text-white"
                        : "bg-gray-900 border border-gray-700 text-gray-300 hover:border-blue-500"
                    }`}
                  >
                    {d}m
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startSession}
              disabled={!selectedGoal || goals.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all"
            >
              Start {duration} Minute Session →
            </button>

            <p className="text-center text-gray-600 text-xs mt-4">
              Your phone can wait. Your future self can't.
            </p>
          </div>
        </div>
      </div>
    );
  }

 
  if (phase === "focus") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      
        <div className="flex justify-between items-center px-6 py-4 opacity-30 hover:opacity-100 transition-all duration-500">
          <span className="text-sm text-gray-400 font-medium">
            {selectedGoal?.title}
          </span>
          <button
            onClick={endEarly}
            className="text-sm text-red-400 hover:text-red-300"
          >
            End Session
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-16 px-6">

        
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 260 260">
                {/* background track */}
                <circle
                  cx="130" cy="130" r={radius}
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="6"
                />
              
                <circle
                  cx="130" cy="130" r={radius}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - (progress / 100) * circumference}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold font-mono tracking-tight">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-gray-500 text-sm mt-2">
                  {isRunning ? "Deep Focus" : "⏸ Paused"}
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={pauseResume}
                className="px-8 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 font-semibold transition-all"
              >
                {isRunning ? "Pause" : "Resume"}
              </button>
              <button
                onClick={endEarly}
                className="px-8 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold transition-all border border-red-500/20"
              >
                Done Early
              </button>
            </div>
          </div>

         
          <div className="w-full max-w-sm">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">
              Session Notes
            </p>
            <textarea
              rows="12"
              placeholder={`Write as you learn...\n\n- Key concepts\n- Questions that come up\n- Code snippets\n- Ideas\n- Things to revisit`}
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-700 resize-none focus:outline-none focus:border-blue-500 leading-relaxed"
            />
            <p className="text-xs text-gray-700 mt-2">
              Saved with your session automatically.
            </p>
          </div>
        </div>
      </div>
    );
  }


  if (phase === "completed") {
    return (
      <JournalPrompt
        goal={selectedGoal}
        elapsed={elapsed}
        navigate={navigate}
      />
    );
  }

  return null;
};

export default FocusMode;