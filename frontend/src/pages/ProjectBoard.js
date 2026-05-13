import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const COLUMNS = [
  { id: "todo", label: "To Do", emoji: "📋", border: "border-gray-300 dark:border-gray-700" },
  { id: "inprogress", label: "In Progress", emoji: "🔄", border: "border-blue-400 dark:border-blue-700" },
  { id: "done", label: "Done", emoji: "✅", border: "border-green-400 dark:border-green-700" },
];

const PRIORITY = {
  low: { label: "Low", style: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400" },
  medium: { label: "Medium", style: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400" },
  high: { label: "High", style: "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400" },
};

const STATUS_ORDER = ["todo", "inprogress", "done"];

const ProjectBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [filterGoal, setFilterGoal] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", priority: "medium", GoalId: "" });
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [tasksRes, goalsRes] = await Promise.all([
        API.get("/tasks"),
        API.get("/goals"),
      ]);
      setTasks(tasksRes.data);
      setGoals(goalsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", { ...form, GoalId: form.GoalId || null });
      setForm({ title: "", description: "", priority: "medium", GoalId: "" });
      setShowForm(false);
      fetchAll();
    } catch (err) {
      console.log(err);
    }
  };

  const moveTask = async (taskId, direction) => {
    const task = tasks.find((t) => t.id === taskId);
    const idx = STATUS_ORDER.indexOf(task.status);
    const newStatus = STATUS_ORDER[idx + direction];
    if (!newStatus) return;
    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t.id !== taskId));
      if (expandedId === taskId) setExpandedId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTasks =
    filterGoal === "all"
      ? tasks
      : tasks.filter((t) => t.GoalId === Number(filterGoal));

  const byStatus = (status) => filteredTasks.filter((t) => t.status === status);

  const completedCount = tasks.filter((t) => t.status === "done").length;
  const totalCount = tasks.length;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white">

        {/* NAVBAR */}
        <div className="flex flex-wrap justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 gap-3">
          <div>
            <h1 className="text-xl font-bold">🗂️ Project Board</h1>
            <p className="text-xs text-gray-400">
              {completedCount}/{totalCount} tasks done
              {totalCount > 0 && (
                <span className="ml-2 text-green-500 font-semibold">
                  {Math.round((completedCount / totalCount) * 100)}%
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={filterGoal}
              onChange={(e) => setFilterGoal(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-black dark:text-white"
            >
              <option value="all">All Goals</option>
              {goals.map((g) => (
                <option key={g.id} value={g.id}>{g.title}</option>
              ))}
            </select>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              + Add Task
            </button>
            <button
              onClick={() => navigate("/today")}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm"
            >
              ← Today
            </button>
          </div>
        </div>

        
        {totalCount > 0 && (
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-800">
            <div
              className="h-1 bg-green-500 transition-all duration-500"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        )}

        
        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLUMNS.map((col) => {
              const colTasks = byStatus(col.id);
              return (
                <div key={col.id} className="flex flex-col min-h-96">

                  <div className={`flex items-center justify-between mb-4 pb-3 border-b-2 ${col.border}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{col.emoji}</span>
                      <h2 className="font-bold text-base">{col.label}</h2>
                    </div>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {colTasks.length}
                    </span>
                  </div>

                  
                  <div className="flex flex-col gap-3">
                    {colTasks.length === 0 ? (
                      <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm">
                          {col.id === "todo" ? "No tasks yet" : "Nothing here"}
                        </p>
                        {col.id === "todo" && (
                          <button
                            onClick={() => setShowForm(true)}
                            className="mt-2 text-blue-500 text-xs underline"
                          >
                            Add first task
                          </button>
                        )}
                      </div>
                    ) : (
                      colTasks.map((task) => {
                        const goal = goals.find((g) => g.id === task.GoalId);
                        const p = PRIORITY[task.priority] || PRIORITY.medium;
                        const statusIdx = STATUS_ORDER.indexOf(task.status);
                        const isExpanded = expandedId === task.id;

                        return (
                          <div
                            key={task.id}
                            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
                          >
                            {/* Top row */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.style}`}>
                                  {p.label}
                                </span>
                                {goal && (
                                  <span className="text-xs text-gray-400 truncate max-w-24">
                                    {goal.title}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors flex-shrink-0 text-lg leading-none"
                              >
                                ×
                              </button>
                            </div>

                           
                            <h3 className={`font-semibold text-sm leading-snug mb-2 ${task.status === "done" ? "line-through text-gray-400" : ""}`}>
                              {task.title}
                            </h3>

                          
                            {task.description && (
                              <div className="mb-3">
                                <p className={`text-xs text-gray-500 dark:text-gray-400 leading-relaxed ${!isExpanded ? "line-clamp-2" : ""}`}>
                                  {task.description}
                                </p>
                                {task.description.length > 80 && (
                                  <button
                                    onClick={() => setExpandedId(isExpanded ? null : task.id)}
                                    className="text-xs text-blue-500 mt-1"
                                  >
                                    {isExpanded ? "Show less" : "Read more"}
                                  </button>
                                )}
                              </div>
                            )}

                            
                            <div className="flex items-center gap-2 mt-3">
                              {statusIdx > 0 && (
                                <button
                                  onClick={() => moveTask(task.id, -1)}
                                  className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium"
                                >
                                  ← Back
                                </button>
                              )}
                              {statusIdx < STATUS_ORDER.length - 1 && (
                                <button
                                  onClick={() => moveTask(task.id, 1)}
                                  className={`flex-1 text-xs py-1.5 rounded-lg font-semibold transition-all text-white ${
                                    statusIdx === 1
                                      ? "bg-green-600 hover:bg-green-700"
                                      : "bg-blue-600 hover:bg-blue-700"
                                  }`}
                                >
                                  {statusIdx === 0 ? "→ Start" : "✓ Mark Done"}
                                </button>
                              )}
                              {task.status === "done" && (
                                <span className="flex-1 text-center text-xs text-green-500 font-semibold py-1.5">
                                  ✅ Completed
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

   
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold">Add New Task</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-black dark:hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <form onSubmit={createTask} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                    Task title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Build the login page"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    autoFocus
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="What needs to happen? Any details or notes..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                      Priority
                    </label>
                    <select
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🔴 High</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                      Linked to Goal
                    </label>
                    <select
                      value={form.GoalId}
                      onChange={(e) => setForm({ ...form, GoalId: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none"
                    >
                      <option value="">No goal</option>
                      {goals.map((g) => (
                        <option key={g.id} value={g.id}>{g.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all"
                  >
                    Create Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-black dark:hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectBoard;