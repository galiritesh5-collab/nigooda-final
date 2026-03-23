// ai/grokClient.js

require("dotenv").config();

const axios = require("axios");



/* =========================================
   CONFIG
========================================= */

const GROK_API_KEY = process.env.GROK_API_KEY;

const GROK_API_URL =
  process.env.GROK_API_URL ||
  "https://api.x.ai/v1/chat/completions";

const GROK_MODEL =
  process.env.GROK_MODEL ||
  "grok-2-latest";



// Safety check

if (!GROK_API_KEY) {

  throw new Error(
    "❌ GROK_API_KEY missing in .env"
  );

}



/* =========================================
   SETTINGS
========================================= */

const MAX_RETRIES = 3;

const TIMEOUT_MS = 20000;

const BASE_DELAY = 1000;



/* =========================================
   Delay Helper
========================================= */

function delay(ms) {

  return new Promise(resolve =>
    setTimeout(resolve, ms)
  );

}



/* =========================================
   Retry Wrapper
========================================= */

async function sendRequestWithRetry(
  payload,
  retries = MAX_RETRIES
) {

  try {

    const response =
      await axios.post(
        GROK_API_URL,
        payload,
        {
          headers: {

            "Authorization":
              `Bearer ${GROK_API_KEY}`,

            "Content-Type":
              "application/json"

          },

          timeout: TIMEOUT_MS
        }
      );

    return response.data;

  } catch (error) {

    if (retries <= 0) {

      console.error(
        "❌ Grok API failed:",
        error.message
      );

      throw new Error(
        "Grok API request failed"
      );

    }



    const delayTime =
      BASE_DELAY *
      Math.pow(
        2,
        MAX_RETRIES - retries
      );



    console.warn(
      `⚠️ Retry in ${delayTime}ms...`
    );



    await delay(delayTime);



    return sendRequestWithRetry(
      payload,
      retries - 1
    );

  }

}



/* =========================================
   MAIN FUNCTION
========================================= */

async function callGrok(prompt) {

  const payload = {

    model: GROK_MODEL,

    temperature: 0,

    messages: [

      {
        role: "system",
        content:
          "You are a food ingredient classification expert. Always return valid JSON only."
      },

      {
        role: "user",
        content: prompt
      }

    ]

  };



  const result =
    await sendRequestWithRetry(
      payload
    );



  if (
    !result ||
    !result.choices ||
    !result.choices[0]
  ) {

    throw new Error(
      "Invalid Grok response structure"
    );

  }



  const content =
    result.choices[0]
      .message
      .content;



  return content;

}



module.exports = callGrok;