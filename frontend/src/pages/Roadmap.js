import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

// ─── LEARNING PATHS DEFINITION ─────────────────────────────────────────────
const PATHS = {
  fullstack: {
    name: "Full Stack Web Development",
    emoji: "🌐",
    description: "HTML to deployed SaaS — the complete web developer path",
    stages: [
      {
        name: "Foundations",
        topics: [
          { id: "fs-html", name: "HTML & Semantic Structure" },
          { id: "fs-css", name: "CSS, Flexbox & Grid" },
          { id: "fs-js-basics", name: "JavaScript Fundamentals" },
          { id: "fs-git", name: "Git & Version Control" },
          { id: "fs-terminal", name: "Terminal Basics" },
        ],
      },
      {
        name: "Frontend",
        topics: [
          { id: "fs-react", name: "React Basics & JSX" },
          { id: "fs-hooks", name: "React Hooks & State" },
          { id: "fs-routing", name: "React Router" },
          { id: "fs-api", name: "API Integration (Axios)" },
          { id: "fs-tailwind", name: "Tailwind CSS" },
        ],
      },
      {
        name: "Backend",
        topics: [
          { id: "fs-nodejs", name: "Node.js Basics" },
          { id: "fs-express", name: "Express.js & REST APIs" },
          { id: "fs-sql", name: "SQL & PostgreSQL" },
          { id: "fs-orm", name: "Sequelize / Prisma" },
          { id: "fs-auth", name: "Authentication & JWT" },
        ],
      },
      {
        name: "Advanced",
        topics: [
          { id: "fs-deploy", name: "Deployment (Railway/Vercel)" },
          { id: "fs-docker", name: "Docker Basics" },
          { id: "fs-testing", name: "Testing with Jest" },
          { id: "fs-perf", name: "Performance & Optimization" },
          { id: "fs-security", name: "Web Security Basics" },
        ],
      },
      {
        name: "Build",
        topics: [
          { id: "fs-portfolio", name: "Portfolio Project" },
          { id: "fs-saas", name: "Full SaaS Application" },
          { id: "fs-open-source", name: "Open Source Contribution" },
        ],
      },
    ],
  },

  datascience: {
    name: "Data Science",
    emoji: "📊",
    description: "From Python basics to deploying machine learning models",
    stages: [
      {
        name: "Foundations",
        topics: [
          { id: "ds-python", name: "Python Basics" },
          { id: "ds-math", name: "Math & Statistics Basics" },
          { id: "ds-linear-algebra", name: "Linear Algebra Essentials" },
          { id: "ds-git", name: "Git & Jupyter Notebooks" },
        ],
      },
      {
        name: "Data Tools",
        topics: [
          { id: "ds-numpy", name: "NumPy" },
          { id: "ds-pandas", name: "Pandas" },
          { id: "ds-matplotlib", name: "Matplotlib & Seaborn" },
          { id: "ds-sql", name: "SQL for Data Analysis" },
        ],
      },
      {
        name: "Machine Learning",
        topics: [
          { id: "ds-sklearn", name: "Scikit-learn" },
          { id: "ds-regression", name: "Regression Models" },
          { id: "ds-classification", name: "Classification Models" },
          { id: "ds-clustering", name: "Clustering" },
          { id: "ds-feature", name: "Feature Engineering" },
        ],
      },
      {
        name: "Advanced",
        topics: [
          { id: "ds-neural", name: "Neural Networks Basics" },
          { id: "ds-nlp", name: "NLP Fundamentals" },
          { id: "ds-timeseries", name: "Time Series Analysis" },
          { id: "ds-deploy", name: "Model Deployment" },
        ],
      },
      {
        name: "Build",
        topics: [
          { id: "ds-kaggle", name: "Kaggle Competition" },
          { id: "ds-end-to-end", name: "End-to-End ML Project" },
          { id: "ds-portfolio", name: "Data Science Portfolio" },
        ],
      },
    ],
  },

  aiml: {
    name: "AI / Machine Learning",
    emoji: "🤖",
    description: "Math foundations to building and deploying real AI systems",
    stages: [
      {
        name: "Foundations",
        topics: [
          { id: "ai-python", name: "Python (Intermediate+)" },
          { id: "ai-linear-algebra", name: "Linear Algebra" },
          { id: "ai-calculus", name: "Calculus & Gradients" },
          { id: "ai-probability", name: "Probability & Statistics" },
        ],
      },
      {
        name: "ML Fundamentals",
        topics: [
          { id: "ai-sklearn", name: "Scikit-learn" },
          { id: "ai-supervised", name: "Supervised Learning" },
          { id: "ai-unsupervised", name: "Unsupervised Learning" },
          { id: "ai-eval", name: "Model Evaluation" },
          { id: "ai-feature", name: "Feature Engineering" },
        ],
      },
      {
        name: "Deep Learning",
        topics: [
          { id: "ai-pytorch", name: "PyTorch or TensorFlow" },
          { id: "ai-neural", name: "Neural Networks" },
          { id: "ai-cnn", name: "CNNs & Computer Vision" },
          { id: "ai-rnn", name: "RNNs & LSTMs" },
          { id: "ai-transformers", name: "Transformers & Attention" },
        ],
      },
      {
        name: "Advanced AI",
        topics: [
          { id: "ai-llms", name: "Large Language Models" },
          { id: "ai-finetuning", name: "Fine-tuning Models" },
          { id: "ai-rag", name: "RAG Systems" },
          { id: "ai-mlops", name: "MLOps & Deployment" },
          { id: "ai-agents", name: "AI Agents" },
        ],
      },
      {
        name: "Build",
        topics: [
          { id: "ai-paper", name: "Implement a Research Paper" },
          { id: "ai-product", name: "Build an AI Product" },
          { id: "ai-open-source", name: "Open Source AI Contribution" },
        ],
      },
    ],
  },

  backend: {
    name: "Backend Development",
    emoji: "⚙️",
    description: "APIs, databases, architecture — the full backend engineer path",
    stages: [
      {
        name: "Foundations",
        topics: [
          { id: "be-programming", name: "Programming Fundamentals" },
          { id: "be-git", name: "Git & Terminal" },
          { id: "be-http", name: "HTTP & Web Basics" },
          { id: "be-dsa", name: "Data Structures & Algorithms" },
        ],
      },
      {
        name: "Core Backend",
        topics: [
          { id: "be-nodejs", name: "Node.js" },
          { id: "be-express", name: "Express.js" },
          { id: "be-rest", name: "REST API Design" },
          { id: "be-auth", name: "Authentication & JWT" },
          { id: "be-validation", name: "Validation & Error Handling" },
        ],
      },
      {
        name: "Databases",
        topics: [
          { id: "be-sql", name: "SQL & PostgreSQL" },
          { id: "be-orm", name: "Sequelize / Prisma" },
          { id: "be-nosql", name: "MongoDB & NoSQL" },
          { id: "be-redis", name: "Redis & Caching" },
          { id: "be-migrations", name: "Database Migrations" },
        ],
      },
      {
        name: "Advanced",
        topics: [
          { id: "be-queues", name: "Message Queues" },
          { id: "be-microservices", name: "Microservices Architecture" },
          { id: "be-docker", name: "Docker & Containers" },
          { id: "be-cicd", name: "CI/CD Pipelines" },
          { id: "be-monitoring", name: "Logging & Monitoring" },
        ],
      },
      {
        name: "Build",
        topics: [
          { id: "be-api-project", name: "Production API Project" },
          { id: "be-system-design", name: "System Design Practice" },
          { id: "be-portfolio", name: "Backend Portfolio" },
        ],
      },
    ],
  },

  frontend: {
    name: "Frontend Development",
    emoji: "🎨",
    description: "UI, UX, animations — become a world-class frontend developer",
    stages: [
      {
        name: "Foundations",
        topics: [
          { id: "fe-html", name: "HTML & Accessibility" },
          { id: "fe-css", name: "CSS Mastery" },
          { id: "fe-js", name: "JavaScript Deep Dive" },
          { id: "fe-git", name: "Git Basics" },
        ],
      },
      {
        name: "React",
        topics: [
          { id: "fe-react", name: "React Fundamentals" },
          { id: "fe-hooks", name: "Hooks & Custom Hooks" },
          { id: "fe-router", name: "React Router" },
          { id: "fe-context", name: "Context & State Management" },
          { id: "fe-perf", name: "React Performance" },
        ],
      },
      {
        name: "Styling & UX",
        topics: [
          { id: "fe-tailwind", name: "Tailwind CSS" },
          { id: "fe-animations", name: "CSS Animations & Framer Motion" },
          { id: "fe-responsive", name: "Responsive Design" },
          { id: "fe-design-systems", name: "Design Systems" },
          { id: "fe-ux", name: "UX Principles" },
        ],
      },
      {
        name: "Advanced",
        topics: [
          { id: "fe-typescript", name: "TypeScript" },
          { id: "fe-testing", name: "Testing (Vitest/RTL)" },
          { id: "fe-nextjs", name: "Next.js" },
          { id: "fe-ssr", name: "SSR & SSG" },
          { id: "fe-pwa", name: "Progressive Web Apps" },
        ],
      },
      {
        name: "Build",
        topics: [
          { id: "fe-component-lib", name: "Component Library" },
          { id: "fe-saas-ui", name: "SaaS Frontend Project" },
          { id: "fe-portfolio", name: "Frontend Portfolio" },
        ],
      },
    ],
  },
};

const STATUS = {
  not_started: {
    label: "Not Started",
    color: "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
    dot: "bg-gray-300 dark:bg-gray-600",
    next: "learning",
  },
  learning: {
    label: "Learning",
    color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800",
    dot: "bg-yellow-400",
    next: "confident",
  },
  confident: {
    label: "Confident",
    color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800",
    dot: "bg-green-500",
    next: "not_started",
  },
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
const Roadmap = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [progress, setProgress] = useState({}); // { topicId: status }
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  // Load saved path and progress from backend
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await API.get("/roadmap");
        const map = {};
        res.data.forEach((item) => {
          map[item.topicKey] = item.status;
        });
        setProgress(map);

        // Restore saved path
        const savedPath = localStorage.getItem("selectedPath");
        if (savedPath && PATHS[savedPath]) setSelectedPath(savedPath);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgress();
  }, []);

  const selectPath = (pathId) => {
    setSelectedPath(pathId);
    localStorage.setItem("selectedPath", pathId);
    setAiSuggestion("");
  };

  const cycleStatus = async (topicId) => {
    const current = progress[topicId] || "not_started";
    const next = STATUS[current].next;
    const updated = { ...progress, [topicId]: next };
    setProgress(updated);
    try {
      await API.post("/roadmap", {
        topicKey: topicId,
        pathId: selectedPath,
        status: next,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAiSuggestion = async () => {
    if (!selectedPath) return;
    setLoadingAi(true);
    setAiSuggestion("");
    const path = PATHS[selectedPath];
    const learning = [];
    const confident = [];
    const notStarted = [];

    path.stages.forEach((stage) => {
      stage.topics.forEach((topic) => {
        const status = progress[topic.id] || "not_started";
        if (status === "learning") learning.push(topic.name);
        if (status === "confident") confident.push(topic.name);
        if (status === "not_started") notStarted.push(topic.name);
      });
    });

    const prompt = `I am learning ${path.name}.
Confident in: ${confident.join(", ") || "nothing yet"}.
Currently learning: ${learning.join(", ") || "nothing"}.
Not started yet: ${notStarted.slice(0, 8).join(", ")}.

Give me a focused 3-sentence suggestion: what should I study in my next session, why, and one specific resource or action to take. Be direct and practical.`;

    try {
      const res = await API.post("/ai/coach", { message: prompt });
      setAiSuggestion(res.data.reply);
    } catch (err) {
      console.log(err);
    }
    setLoadingAi(false);
  };

  // ── Stats calculation ──
  const getPathStats = () => {
    if (!selectedPath) return null;
    const path = PATHS[selectedPath];
    let total = 0;
    let confident = 0;
    let learning = 0;
    let currentStageIndex = 0;

    path.stages.forEach((stage, si) => {
      stage.topics.forEach((topic) => {
        total++;
        const s = progress[topic.id] || "not_started";
        if (s === "confident") confident++;
        if (s === "learning") learning++;
      });
      const stageConfident = stage.topics.filter(
        (t) => (progress[t.id] || "not_started") === "confident"
      ).length;
      if (stageConfident === stage.topics.length && si >= currentStageIndex) {
        currentStageIndex = si + 1;
      }
    });

    return {
      total,
      confident,
      learning,
      notStarted: total - confident - learning,
      percentage: Math.round((confident / total) * 100),
      currentStage: Math.min(currentStageIndex, path.stages.length - 1),
    };
  };

  const stats = getPathStats();

  
  if (!selectedPath) {
    return (
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white">
          <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-xl font-bold">🗺️ Learning Roadmap</h1>
            <button onClick={() => navigate("/today")} className="text-sm text-gray-500 hover:text-black dark:hover:text-white">
              ← Back
            </button>
          </div>

          <div className="max-w-4xl mx-auto p-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-3">What are you learning?</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Pick your path. Track every topic. Know exactly where you are.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Object.entries(PATHS).map(([id, path]) => (
                <button
                  key={id}
                  onClick={() => selectPath(id)}
                  className="text-left p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl transition-all group"
                >
                  <p className="text-4xl mb-3">{path.emoji}</p>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {path.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {path.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {path.stages.reduce((sum, s) => sum + s.topics.length, 0)} topics across{" "}
                    {path.stages.length} stages
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const path = PATHS[selectedPath];

  
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white">

        {/* NAVBAR */}
        <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{path.emoji}</span>
            <div>
              <h1 className="text-lg font-bold leading-tight">{path.name}</h1>
              <p className="text-xs text-gray-400">Learning Roadmap</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setSelectedPath(null); localStorage.removeItem("selectedPath"); }}
              className="px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Switch Path
            </button>
            <button
              onClick={() => navigate("/today")}
              className="px-3 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              ← Back
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-6">

         
          {stats && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">

                <div className="text-center md:text-left">
                  <p className="text-6xl font-bold text-blue-600">{stats.percentage}%</p>
                  <p className="text-gray-400 text-sm mt-1">overall complete</p>
                </div>

                <div className="flex-1">
            
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 mb-4 overflow-hidden">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>

                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-bold text-black dark:text-white">{stats.confident}</span> confident
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-bold text-black dark:text-white">{stats.learning}</span> learning
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-bold text-black dark:text-white">{stats.notStarted}</span> not started
                      </span>
                    </div>
                  </div>
                </div>

              
                <button
                  onClick={getAiSuggestion}
                  disabled={loadingAi}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all"
                >
                  {loadingAi ? "Thinking..." : "🤖 What to study next?"}
                </button>
              </div>

             
              {aiSuggestion && (
                <div className="mt-5 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-xl">
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-2">
                    AI Recommendation
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                    {aiSuggestion}
                  </p>
                </div>
              )}
            </div>
          )}

        
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
            <span>Click any topic to update status:</span>
            {Object.entries(STATUS).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${val.dot}`} />
                <span>{val.label}</span>
              </div>
            ))}
          </div>

        
          <div className="flex flex-col gap-6">
            {path.stages.map((stage, si) => {
              const stageConfident = stage.topics.filter(
                (t) => (progress[t.id] || "not_started") === "confident"
              ).length;
              const stagePct = Math.round((stageConfident / stage.topics.length) * 100);
              const isCurrent = si === stats?.currentStage;

              return (
                <div
                  key={stage.name}
                  className={`bg-white dark:bg-gray-900 rounded-2xl border-2 transition-all ${
                    isCurrent
                      ? "border-blue-500 shadow-lg shadow-blue-500/10"
                      : stagePct === 100
                      ? "border-green-200 dark:border-green-900"
                      : "border-gray-200 dark:border-gray-800"
                  }`}
                >
             
                  <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      {isCurrent && (
                        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                          YOU ARE HERE
                        </span>
                      )}
                      {stagePct === 100 && !isCurrent && (
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">
                          ✓ COMPLETE
                        </span>
                      )}
                      <h3 className="font-bold text-lg">
                        Stage {si + 1}: {stage.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">
                        {stageConfident}/{stage.topics.length}
                      </span>
                      <div className="w-20 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            stagePct === 100 ? "bg-green-500" : "bg-blue-500"
                          }`}
                          style={{ width: `${stagePct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Topics grid */}
                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {stage.topics.map((topic) => {
                      const status = progress[topic.id] || "not_started";
                      const s = STATUS[status];

                      return (
                        <button
                          key={topic.id}
                          onClick={() => cycleStatus(topic.id)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${s.color}`}
                        >
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${s.dot}`} />
                          <span className="text-sm font-medium leading-tight">{topic.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

     
          <div className="mt-8 p-6 bg-blue-600 rounded-2xl text-white text-center">
            <h3 className="text-xl font-bold mb-1">Ready to study?</h3>
            <p className="text-blue-200 text-sm mb-4">
              Start a focus session on your current stage topics.
            </p>
            <button
              onClick={() => navigate("/focus")}
              className="bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all"
            >
              🎯 Start Focus Session →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Roadmap;