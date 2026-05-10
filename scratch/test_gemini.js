const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // This will fail if not found
  
  // Or use the actual listModels method
  try {
    const genAI2 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Note: listModels is not on genAI instance directly in some versions, 
    // it might be on the client or require a different approach.
    // In @google/generative-ai, it's not a public method on the main class easily.
    
    console.log("Testing gemini-1.5-flash...");
    const model = genAI2.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent("Hi");
    console.log("Success:", result.response.text());
  } catch (e) {
    console.error("Failed:", e.message);
  }
}

listModels();
