// routes/ai.js
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/ai-chat", async (req, res) => {
  const { model, messages } = req.body;
  console.log("Received request to Gemini API:", req.body);

  try {
    // Call Gemini API endpoint
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messages.map(msg => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      }),
    });

    // Check if the response is ok (status code 200)
    if (!geminiRes.ok) {
      const errorData = await geminiRes.json();
      console.error("Gemini API error response:", errorData);
      throw new Error(`Gemini API responded with status ${geminiRes.status}: ${errorData.error?.message || "Unknown error"}`);
    }

    const data = await geminiRes.json();
    console.log("Gemini API response:", JSON.stringify(data, null, 2));

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    console.log("Gemini API reply:", reply);

    // Send the response back to the client
    res.json({ reply });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Failed to get a response from Gemini API", details: error.message });
  }
});

module.exports = router;