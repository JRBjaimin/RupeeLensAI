const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
async function run() {
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro','gemini-2.0-flash', 'gemini-2.5-flash','gemini-flash-latest'];
  for (const m of models) {
    try {
      await ai.models.generateContent({ model: m, contents: "test" });
      console.log("✅ OK: " + m);
    } catch (e) {
      console.log("❌ FAIL " + m + ": " + e.status + " " + (e.status === 429 ? "RATE LIMIT" : e.message));
    }
  }
}
run();
