const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // There is no listModels on the main class, but we can try to fetch from the raw endpoint
    // or use the googleapis package. 
    // Actually, let's try a very old model name to see if it works.
    console.log("Testing gemini-pro...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hi");
    console.log("Success with gemini-pro:", result.response.text());
  } catch (e) {
    console.error("Failed with gemini-pro:", e.message);
  }
}

listModels();
