import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await API.get("/journal");
        setEntries(res.data);
        if (res.data.length > 0) setSelected(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEntries();
  }, []);

  const moods = ["", "😴", "😐", "🙂", "😊", "🔥"];
  const moodLabels = ["", "Distracted", "Okay", "Good", "Great", "On Fire"];

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const formatDateShort = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white">

       
        <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h1 className="text-xl font-bold">📝 Learning Journal</h1>
            <p className="text-xs text-gray-400">{entries.length} entries — your full learning story</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/focus")}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
            >
              + New Session
            </button>
            <button
              onClick={() => navigate("/today")}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm"
            >
              ← Back
            </button>
          </div>
        </div>

        {entries.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-6xl mb-4">📖</p>
              <h2 className="text-2xl font-bold mb-2">No entries yet</h2>
              <p className="text-gray-400 mb-6">
                Complete a focus session to create your first journal entry.
              </p>
              <button
                onClick={() => navigate("/focus")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Start a Focus Session →
              </button>
            </div>
          </div>
        ) : (
          <div
            className="flex max-w-6xl mx-auto gap-0"
            style={{ height: "calc(100vh - 73px)" }}
          >

          
            <div className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                  {entries.length} Sessions
                </p>
              </div>
              <div className="overflow-y-auto flex-1">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => setSelected(entry)}
                    className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-all ${
                      selected?.id === entry.id
                        ? "bg-blue-50 dark:bg-blue-950/40 border-l-4 border-l-blue-500"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-gray-400">
                        {formatDateShort(entry.createdAt)}
                      </span>
                      <span className="text-base">{moods[entry.mood] || ""}</span>
                    </div>
                    <p className="text-sm font-semibold truncate text-gray-800 dark:text-gray-200">
                      {entry.learned || "No summary"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {entry.sessionDuration} min session
                    </p>
                  </div>
                ))}
              </div>
            </div>

          
            <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
              {!selected ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <p className="text-4xl mb-3">📖</p>
                    <p>Select an entry to read</p>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto p-10">

                 
                  <div className="mb-10">
                    <p className="text-3xl font-bold mb-2">{formatDate(selected.createdAt)}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>⏱ {selected.sessionDuration} minute session</span>
                      {selected.mood && (
                        <span>
                          {moods[selected.mood]} {moodLabels[selected.mood]} focus
                        </span>
                      )}
                    </div>
                  </div>

                 
                  {selected.learned && (
                    <div className="mb-8">
                      <h3 className="text-xs uppercase tracking-widest font-bold text-green-500 mb-3">
                        ✅ What I Learned
                      </h3>
                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900 p-5 rounded-2xl">
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                          {selected.learned}
                        </p>
                      </div>
                    </div>
                  )}

                  {selected.confusing && (
                    <div className="mb-8">
                      <h3 className="text-xs uppercase tracking-widest font-bold text-orange-500 mb-3">
                        🤔 What Was Confusing
                      </h3>
                      <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900 p-5 rounded-2xl">
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                          {selected.confusing}
                        </p>
                      </div>
                    </div>
                  )}

                  {selected.nextStep && (
                    <div className="mb-8">
                      <h3 className="text-xs uppercase tracking-widest font-bold text-blue-500 mb-3">
                        → Next Step
                      </h3>
                      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 p-5 rounded-2xl">
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                          {selected.nextStep}
                        </p>
                      </div>
                    </div>
                  )}

                  {!selected.learned && !selected.confusing && !selected.nextStep && (
                    <p className="text-gray-400 italic">No reflection recorded for this session.</p>
                  )}

                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;