// ai/llamaClient.js (TEMP DEBUG VERSION)

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

async function callLlama(prompt) {

  try {

    console.log("🔍 Checking available models...");

    const models =
      await client.models.list();

    console.log(
      "✅ AVAILABLE MODELS:"
    );

    models.data.forEach(m => {
      console.log(m.id);
    });

    throw new Error(
      "Model list printed — now choose one."
    );

  }

  catch (error) {

    console.error(
      "❌ Llama Debug Error:",
      error.message
    );

    throw error;

  }

}

module.exports = callLlama;