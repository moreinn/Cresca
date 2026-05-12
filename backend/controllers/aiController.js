import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const askAI = async (req, res) => {
  try {
    const { message, field } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a personal growth assistant inside an app called Cresca.
          You ONLY help users with learning, studying, skill development, business growth,
          and personal goals. The user is currently focused on: ${field || "general growth"}.
          If asked anything unrelated, politely decline and refocus them on their goals.
          Keep responses concise, motivating, and actionable.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 500,
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI failed to respond" });
  }
};