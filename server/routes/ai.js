import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/ask", auth, async (req, res) => {
  const { question, nodeLabel } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  // If no key, use the canned fallback
  if (!apiKey) {
    return res.json({
      answer: `💡 Quick guidance for "${nodeLabel}":\n\n1. Read the official docs first.\n2. Build a small project (not just tutorials).\n3. Teach it to someone else — you'll spot gaps.\n4. Then move to the next node.\n\n(Add GEMINI_API_KEY to .env for real AI answers.)`,
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful coding mentor. A student learning "${nodeLabel}" asks: "${question}". Give a concise, encouraging answer.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No answer.";
    res.json({ answer });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

export default router;