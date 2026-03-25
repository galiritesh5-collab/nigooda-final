// ai/processingAI.js

const callGrok =
  require("./grokClient");



/* =========================================
   BUILD PROMPT
========================================= */

function buildProcessingPrompt(
  ingredientList
) {

  if (!Array.isArray(ingredientList)) {

    throw new Error(
      "Processing input must be array"
    );

  }



  return `

You are a food processing expert.

Analyze the FULL ingredient list.

Ingredients:

${ingredientList.join(", ")}



Return ONLY valid JSON.

Allowed Processing Types:

deep_fried
extruded
refined_oil_frying
moderately_processed



Processing Level:

minimal
moderate
highly_processed



Return format:

{
"processing_types": [],
"processing_level":
"minimal | moderate | highly_processed"
}

Return JSON only.

`;

}



/* =========================================
   VALIDATION
========================================= */

const VALID_TYPES = [

  "deep_fried",
  "extruded",
  "refined_oil_frying",
  "moderately_processed"

];



function validateProcessing(
  data
) {

  if (!data.processing_types) {

    data.processing_types = [];

  }



  data.processing_types =
    data.processing_types.filter(

      type =>
        VALID_TYPES.includes(type)

    );



  if (!data.processing_level) {

    data.processing_level =
      "moderate";

  }



  return data;

}



/* =========================================
   MAIN FUNCTION
========================================= */

async function classifyProcessing(
  ingredientList
) {

  try {

    const prompt =
      buildProcessingPrompt(
        ingredientList
      );



    const raw =
      await callGrok(
        prompt
      );



    let parsed;



    try {

      parsed =
        JSON.parse(raw);

    }

    catch {

      throw new Error(
        "Invalid JSON from Grok"
      );

    }



    return validateProcessing(
      parsed
    );

  }

  catch (error) {

    console.error(
      "❌ Processing AI error:",
      error.message
    );



    return {

      processing_types: [],

      processing_level:
        "moderate"

    };

  }

}



module.exports =
  classifyProcessing;