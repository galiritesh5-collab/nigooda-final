// ai/ingredientAI.js

/* =========================================
   ✅ UPDATED: LLAMA CLIENT
========================================= */

const callLlama =
  require("./llamaClient");


/* =========================================
   SAFE CATEGORY VALIDATION (SPARSE)
========================================= */

function sanitizeCategories(categories) {

  if (!categories) return {};

  const safe = {};

  for (let key in categories) {

    let value = categories[key];

    if (
      typeof value === "number" &&
      value >= 1 &&
      value <= 5
    ) {

      safe[key] =
        Math.round(value);

    }

  }

  return safe;

}


/* =========================================
   SAFE FLAGS CLEANER
========================================= */

function sanitizeFlags(flags) {

  if (!flags) return {};

  const safe = {};

  for (let key in flags) {

    if (flags[key] === true) {

      safe[key] = true;

    }

  }

  return safe;

}


/* =========================================
   SAFE ARRAY CLEANER
========================================= */

function sanitizeArray(arr) {

  if (!Array.isArray(arr))
    return [];

  return arr.filter(
    item =>
      typeof item === "string" &&
      item.length > 0
  );

}


/* =========================================
   OUTPUT VALIDATION
========================================= */

function validateAIResponse(data, ingredientName) {

  if (!data) {

    throw new Error(
      "AI returned empty response"
    );

  }


  // Canonical name fallback

  if (!data.canonical_name) {

    data.canonical_name =
      ingredientName;

  }


  // Sparse categories

  data.categories =
    sanitizeCategories(
      data.categories
    );


  // Sparse flags

  data.flags =
    sanitizeFlags(
      data.flags
    );


  // Allergens

  data.allergens =
    sanitizeArray(
      data.allergens
    );


  // Nutrition

  data.nutrition_impact =
    sanitizeFlags(
      data.nutrition_impact
    );


  // Confidence

  if (
    typeof data.confidence_score !== "number"
  ) {

    data.confidence_score = 0.8;

  }


  return data;

}


/* =========================================
   PROMPT BUILDER (SPARSE DESIGN)
========================================= */

function buildPrompt(ingredientName) {

return `

You are a professional food ingredient classification expert.

Classify the ingredient below.

Ingredient:
"${ingredientName}"

Return ONLY valid JSON.



IMPORTANT RULES:

- Only include categories that apply
- Do NOT include categories with 0 values
- Do NOT default everything to "whole"
- Oils must NOT be whole
- Preservatives must include "preservatives"
- Refined oils must include "oils"

Use category scores from 1 to 5.



Allowed Categories:

additives
preservatives
sugars
oils
flavors
colors
stabilizers
extracts
animal
whole



Return format:

{
"canonical_name": "",

"aliases": [],

"categories": {},

"risk_level": "low",

"flags": {},

"allergens": [],

"nutrition_impact": {},

"confidence_score": 0.9
}



Return STRICT JSON only.

`;

}


/* =========================================
   SAFE JSON PARSER
========================================= */

function safeJSONParse(text) {

  try {

    return JSON.parse(text);

  }

  catch {

    console.error(
      "❌ Invalid JSON from AI:",
      text
    );

    throw new Error(
      "AI returned invalid JSON"
    );

  }

}


/* =========================================
   MAIN FUNCTION
========================================= */

async function classifyIngredientAI(
  ingredientName
) {

  try {

    console.log(
      "🧠 Classifying:",
      ingredientName
    );


    const prompt =
      buildPrompt(
        ingredientName
      );


    /* =========================================
       ✅ UPDATED: CALL LLAMA
    ========================================= */

    const rawResponse =
      await callLlama(
        prompt
      );


    const parsed =
      safeJSONParse(
        rawResponse
      );


    const validated =
      validateAIResponse(
        parsed,
        ingredientName
      );


    return validated;

  }

  catch (error) {

    console.error(
      "❌ Ingredient AI failed:",
      error.message
    );


    // SAFE FALLBACK (SPARSE)

    return {

      canonical_name:
        ingredientName,

      aliases: [],

      categories: {},

      risk_level: "low",

      flags: {},

      allergens: [],

      nutrition_impact: {},

      confidence_score: 0.5

    };

  }

}


module.exports =
  classifyIngredientAI;