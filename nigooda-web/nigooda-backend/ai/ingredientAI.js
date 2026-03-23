// ai/ingredientAI.js

const callGrok =
  require("./grokClient");

const mapCategories =
  require("../engine/categoryMapper");


/* =========================================
   OUTPUT VALIDATION
========================================= */

function validateAIResponse(data) {

  if (!data.canonical_name) {

    throw new Error(
      "Missing canonical_name"
    );

  }



  if (!data.categories) {

    data.categories = {};
  }



  if (!data.penalty_flags) {

    data.penalty_flags = {};
  }



  if (!data.derived_flags) {

    data.derived_flags = {};
  }



  if (!data.confidence_score) {

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

Classify the ingredient below using the defined category rules.

Ingredient:
"${ingredientName}"

Return ONLY valid JSON.

Use EXACT star ratings (1–5 integers).

Follow these category definitions strictly.



CATEGORY RULES:

ADDlTIVES:
5 = Natural functional additives
4 = Low-risk food-grade additives
3 = Neutral additives
2 = Synthetic mild-risk additives
1 = High-risk additives

PRESERVATIVES:
5 = Natural preservation
4 = Mild preservative
3 = Moderate preservative
2 = Synthetic preservative
1 = Strong chemical preservative

SUGARS:
5 = Whole-food sweeteners
4 = Low-GI natural sugars
3 = Traditional sugars
2 = Refined syrups
1 = High-risk artificial sugars

OILS:
5 = Cold-pressed healthy fats
4 = Good refined oils
3 = Neutral oils
2 = Industrial omega-6 oils
1 = Trans fats

FLAVORS:
5 = Real food extracts
4 = Natural flavor concentrates
3 = Nature-identical
2 = Artificial blends
1 = Synthetic chemicals

COLORS:
5 = Natural plant colors
4 = Mineral safe colors
3 = Caramel I
2 = Caramel III/IV
1 = Artificial dyes

STABILIZERS:
5 = Natural stabilizers
4 = Food-grade gums
3 = Neutral stabilizers
2 = Controversial emulsifiers
1 = High-risk emulsifiers

EXTRACTS:
5 = Nutritional extracts
4 = Natural extracts
3 = Solvent-based extracts

ANIMAL:
5–4 = Clean dairy
3 = Processed dairy
2 = Animal fat
1 = Highly processed animal derivative

WHOLE:
5 = Whole foods
4 = Minimally processed
3 = Partially processed



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

"risk_level": "low | medium | high",

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

"confidence_score": 0.0
}

Important Rules:

Only assign category if applicable.

Do NOT assign multiple unrelated categories.

If category not relevant → set value 0.

Return JSON only.

`;

}


/* =========================================
   MAIN FUNCTION
========================================= */

async function classifyIngredientAI(
  ingredientName
) {

  try {

    const prompt =
      buildPrompt(
        ingredientName
      );



    const rawResponse =
      await callGrok(
        prompt
      );



    let parsed;



    try {

      parsed =
        JSON.parse(
          rawResponse
        );

    } catch {

      throw new Error(
        "AI returned invalid JSON"
      );

    }



    // NEW SAFE CATEGORY MAPPING
    parsed.categories =
      mapCategories(
        parsed
      );



    const validated =
      validateAIResponse(
        parsed
      );



    return validated;

  } catch (error) {

    console.error(
      "❌ Ingredient AI failed:",
      error.message
    );



    // Safe fallback

    return {

      canonical_name:
        ingredientName,

      aliases: [],

      categories: {},

      risk_level: "low",

      penalty_flags: {},

      derived_flags: {},

      confidence_score: 0.5

    };

  }

}



module.exports =
  classifyIngredientAI;