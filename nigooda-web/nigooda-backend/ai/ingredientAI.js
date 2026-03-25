// ai/ingredientAI.js

const callGrok =
  require("./grokClient");

const mapCategories =
  require("../engine/categoryMapper");



/* =========================================
   DEFAULT CATEGORY STRUCTURE
========================================= */

function getDefaultCategories() {

  return {

    additives: 0,
    preservatives: 0,
    sugars: 0,
    oils: 0,
    flavors: 0,
    colors: 0,
    stabilizers: 0,
    extracts: 0,
    animal: 0,
    whole: 3

  };

}



/* =========================================
   SAFE CATEGORY VALIDATION
========================================= */

function sanitizeCategories(categories) {

  const defaults =
    getDefaultCategories();

  if (!categories) {

    return defaults;

  }



  const safe = {};



  for (let key in defaults) {

    let value =
      categories[key];



    if (
      typeof value !== "number" ||
      value < 0 ||
      value > 5
    ) {

      safe[key] =
        defaults[key];

    }

    else {

      safe[key] =
        Math.round(value);

    }

  }



  return safe;

}



/* =========================================
   OUTPUT VALIDATION
========================================= */

function validateAIResponse(data) {

  if (!data) {

    throw new Error(
      "AI returned empty response"
    );

  }



  if (!data.canonical_name) {

    data.canonical_name =
      "unknown";

  }



  // Ensure categories always valid

  data.categories =
    sanitizeCategories(
      data.categories
    );



  if (!data.penalty_flags) {

    data.penalty_flags = {

      is_trans_fat: false,
      is_artificial_dye: false,
      is_artificial_sweetener: false,
      is_hfcs: false

    };

  }



  if (!data.derived_flags) {

    data.derived_flags = {

      is_refined_oil: false,
      is_ultra_processed: false

    };

  }



  if (
    typeof data.confidence_score !== "number"
  ) {

    data.confidence_score = 0.8;

  }



  return data;

}



/* =========================================
   PROMPT BUILDER
========================================= */

function buildPrompt(ingredientName) {

return `

You are a food ingredient classification expert.

Classify the ingredient below.

Ingredient:
"${ingredientName}"

Return ONLY valid JSON.

Use star ratings from 1–5.

If category not relevant → use 0.



Return format:

{
"canonical_name": "",

"aliases": [],

"categories": {
"additives": 0,
"preservatives": 0,
"sugars": 0,
"oils": 0,
"flavors": 0,
"colors": 0,
"stabilizers": 0,
"extracts": 0,
"animal": 0,
"whole": 0
},

"risk_level": "low",

"penalty_flags": {
"is_trans_fat": false,
"is_artificial_dye": false,
"is_artificial_sweetener": false,
"is_hfcs": false
},

"derived_flags": {
"is_refined_oil": false,
"is_ultra_processed": false
},

"confidence_score": 0.9
}

Return STRICT JSON only.

`;

}



/* =========================================
   SAFE JSON PARSE
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



    const rawResponse =
      await callGrok(
        prompt
      );



    const parsed =
      safeJSONParse(
        rawResponse
      );



    // Apply category mapping

    parsed.categories =
      mapCategories(
        parsed
      );



    const validated =
      validateAIResponse(
        parsed
      );



    return validated;

  }

  catch (error) {

    console.error(
      "❌ Ingredient AI failed:",
      error.message
    );



    // SAFE FALLBACK (VERY IMPORTANT)

    return {

      canonical_name:
        ingredientName,

      aliases: [],

      categories:
        getDefaultCategories(),

      risk_level: "low",

      penalty_flags: {

        is_trans_fat: false,
        is_artificial_dye: false,
        is_artificial_sweetener: false,
        is_hfcs: false

      },

      derived_flags: {

        is_refined_oil: false,
        is_ultra_processed: false

      },

      confidence_score: 0.5

    };

  }

}



module.exports =
  classifyIngredientAI;