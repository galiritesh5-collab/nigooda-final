require("dotenv").config();
const model = require("./engine/geminiClient");

async function testGemini() {

  const result = await model.generateContent("Explain what salt does in food.");

  console.log(result.response.text());

}

testGemini();