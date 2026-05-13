import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import AiCoach from "../components/AiCoach";

const KnowledgeHub = () => {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [resources, setResources] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [activeTab, setActiveTab] = useState("notes");
  const [resourceForm, setResourceForm] = useState({ title: "", link: "", type: "link", notes: "" });
  const [saving, setSaving] = useState(false);
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await API.get("/goals");
        setGoals(res.data);
        if (res.data.length > 0) setSelectedGoal(res.data[0]);
      } catch (err) { console.log(err); }
    };
    fetchGoals();
  }, []);

  useEffect(() => {
    if (!selectedGoal) return;
    fetchResources();
    fetchNotes();
    setSelectedNote(null);
    setNoteContent("");
    setNoteTitle("");
  }, [selectedGoal]);

  const fetchResources = async () => {
    try {
      const res = await API.get(`/resources/${selectedGoal.id}`);
      setResources(res.data);
    } catch (err) { console.log(err); }
  };

  const fetchNotes = async () => {
    try {
      const res = await API.get(`/notes/${selectedGoal.id}`);
      setNotes(res.data);
    } catch (err) { console.log(err); }
  };

  const addResource = async (e) => {
    e.preventDefault();
    try {
      await API.post("/resources", { ...resourceForm, GoalId: selectedGoal.id });
      setResourceForm({ title: "", link: "", type: "link", notes: "" });
      fetchResources();
    } catch (err) { console.log(err); }
  };

  const deleteResource = async (id) => {
    try {
      await API.delete(`/resources/${id}`);
      fetchResources();
    } catch (err) { console.log(err); }
  };

  const createNote = async () => {
    try {
      const res = await API.post("/notes", {
        title: "Untitled Note",
        content: "",
        GoalId: selectedGoal.id,
      });
      await fetchNotes();
      selectNote(res.data);
    } catch (err) { console.log(err); }
  };

  const selectNote = (note) => {
    setSelectedNote(note);
    setNoteTitle(note.title || "");
    setNoteContent(note.content || "");
  };

  const saveNote = async () => {
    if (!selectedNote) return;
    setSaving(true);
    try {
      await API.put(`/notes/${selectedNote.id}`, {
        title: noteTitle,
        content: noteContent,
      });
      fetchNotes();
    } catch (err) { console.log(err); }
    setSaving(false);
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setNoteTitle("");
        setNoteContent("");
      }
      fetchNotes();
    } catch (err) { console.log(err); }
  };

  const typeIcon = (type) => ({ link: "🔗", video: "📹", doc: "📄", book: "📚" }[type] || "🔗");

  const tabs = [
    { key: "notes", label: "📝 Notes" },
    { key: "resources", label: "🔗 Resources" },
    { key: "ai", label: "🤖 AI Coach" },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">

       
        <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
          <h1 className="text-2xl font-bold">📚 Knowledge Hub</h1>
          <button onClick={() => navigate("/dashboard")} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm">
            ← Dashboard
          </button>
        </div>

        <div className="max-w-7xl mx-auto p-6">

         
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow mb-6 flex items-center gap-4">
            <span className="font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">Active Goal:</span>
            {goals.length === 0 ? (
              <p className="text-gray-400">No goals yet. Create one on Dashboard first.</p>
            ) : (
              <select
                value={selectedGoal?.id || ""}
                onChange={(e) => setSelectedGoal(goals.find(g => g.id === Number(e.target.value)))}
                className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
              >
                {goals.map(g => (
                  <option key={g.id} value={g.id}>{g.title} — {Math.round(g.progress)}% complete</option>
                ))}
              </select>
            )}
          </div>

          {/* TABS */}
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        
          {activeTab === "notes" && (
            <div className="flex gap-6" style={{ height: "72vh" }}>

           
              <div className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 rounded-2xl shadow flex flex-col p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Notes</span>
                  <button
                    onClick={createNote}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold"
                  >
                    + New
                  </button>
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto flex-1">
                  {notes.length === 0 ? (
                    <div className="text-center mt-8">
                      <p className="text-gray-400 text-sm">No notes yet.</p>
                      <button onClick={createNote} className="mt-3 text-blue-500 text-sm underline">
                        Create your first note
                      </button>
                    </div>
                  ) : (
                    notes.map((note) => (
                      <div
                        key={note.id}
                        onClick={() => selectNote(note)}
                        className={`p-3 rounded-xl cursor-pointer flex justify-between items-center group ${
                          selectedNote?.id === note.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {note.title || "Untitled"}
                          </p>
                          <p className={`text-xs truncate mt-0.5 ${
                            selectedNote?.id === note.id ? "text-blue-200" : "text-gray-400"
                          }`}>
                            {note.content ? note.content.slice(0, 40) + "..." : "Empty note"}
                          </p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                          className={`text-xs ml-2 opacity-0 group-hover:opacity-100 ${
                            selectedNote?.id === note.id ? "text-blue-200" : "text-red-400"
                          }`}
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

             
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow flex flex-col p-6">
                {!selectedNote ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <p className="text-5xl mb-4">📝</p>
                      <p className="text-xl font-semibold mb-1">Select a note or create one</p>
                      <p className="text-sm">Your knowledge lives here</p>
                      <button
                        onClick={createNote}
                        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                      >
                        Create First Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    
                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                      <input
                        type="text"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        placeholder="Note title..."
                        className="text-2xl font-bold bg-transparent border-none outline-none text-black dark:text-white placeholder-gray-300 flex-1"
                      />
                      <button
                        onClick={saveNote}
                        disabled={saving}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold text-sm ml-4"
                      >
                        {saving ? "Saving..." : "💾 Save"}
                      </button>
                    </div>

                   
                    <textarea
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder={`Start writing here...\n\nYou can write:\n- Study summaries\n- Code snippets\n- Key concepts\n- Questions to research\n- Ideas and plans`}
                      className="flex-1 w-full bg-transparent outline-none resize-none text-black dark:text-white placeholder-gray-400 text-base leading-8 font-mono"
                    />

                   
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                      <span className="text-xs text-gray-400">
                        {noteContent.split(/\s+/).filter(Boolean).length} words · {noteContent.length} characters
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

         
          {activeTab === "resources" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* ADD RESOURCE FORM */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                  <h3 className="text-lg font-bold mb-4">Save a Resource</h3>
                  <form onSubmit={addResource} className="flex flex-col gap-3">
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Node.js Official Docs"
                        value={resourceForm.title}
                        onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Link</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={resourceForm.link}
                        onChange={(e) => setResourceForm({ ...resourceForm, link: e.target.value })}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Type</label>
                      <select
                        value={resourceForm.type}
                        onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value })}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
                      >
                        <option value="link">🔗 Link / Article</option>
                        <option value="video">📹 Video / Course</option>
                        <option value="doc">📄 Documentation</option>
                        <option value="book">📚 Book</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Your notes (optional)</label>
                      <textarea
                        rows="2"
                        placeholder="Why is this useful?"
                        value={resourceForm.notes}
                        onChange={(e) => setResourceForm({ ...resourceForm, notes: e.target.value })}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400"
                      />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                      Save Resource
                    </button>
                  </form>
                </div>
              </div>

             
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                  <h3 className="text-lg font-bold mb-4">
                    Saved Resources <span className="text-gray-400 font-normal">({resources.length})</span>
                  </h3>
                  {resources.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <p className="text-4xl mb-3">🔗</p>
                      <p>No resources saved yet.</p>
                      <p className="text-sm mt-1">Add docs, videos, books, and articles.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {resources.map((r) => (
                        <div key={r.id} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
                          <span className="text-3xl">{typeIcon(r.type)}</span>
                          <div className="flex-1 min-w-0">
                            <a
                              href={r.link}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-blue-600 hover:underline text-base"
                            >
                              {r.title}
                            </a>
                            {r.notes && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{r.notes}</p>
                            )}
                            <p className="text-xs text-gray-400 mt-1 truncate">{r.link}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <a
                              href={r.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg text-center"
                            >
                              Open
                            </a>
                            <button
                              onClick={() => deleteResource(r.id)}
                              className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-3 py-1 rounded-lg"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

         
          {activeTab === "ai" && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <AiCoach />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
