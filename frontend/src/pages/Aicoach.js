import React, { useState } from "react";
import API from "../api/axios";

const AiCoach = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!message) return;

    try {
      setLoading(true);

      const res = await API.post("/ai/coach", {
        message,
      });

      setReply(res.data.reply);

    } catch (err) {
      console.log(err);
      setReply("AI failed to respond");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl transition-all">

      <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
        AI Growth Coach
      </h2>

      <textarea
        rows="4"
        placeholder="Ask AI anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="
          w-full
          p-4
          rounded-xl
          border
          border-gray-300
          bg-white
          dark:bg-gray-800
          text-black
          dark:text-white
          placeholder-gray-500
          dark:placeholder-gray-400
          focus:outline-none
        "
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="
          mt-4
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
        "
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {reply && (
        <div
          className="
            mt-6
            p-5
            rounded-xl
            bg-gray-100
            dark:bg-gray-800
            border
            border-gray-300
            dark:border-gray-700
            whitespace-pre-wrap
          "
        >

          <h3 className="text-xl font-bold text-black dark:text-white mb-3">
            AI Coach
          </h3>

          <p className="text-gray-800 dark:text-gray-200 leading-7">
            {reply}
          </p>

        </div>
      )}

    </div>
  );
};

export default AiCoach;