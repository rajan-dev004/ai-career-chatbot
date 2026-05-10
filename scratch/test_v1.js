const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function testV1() {
  console.log("Testing with apiVersion: 'v1'...");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // Note: The constructor takes apiKey as first arg. 
  // In some versions, it takes an options object as second arg.
  // Let's check the constructor signature.
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1' });
    const result = await model.generateContent("Hi");
    console.log("Success with v1:", result.response.text());
  } catch (e) {
    console.error("Failed with v1:", e.message);
  }
}

testV1();
