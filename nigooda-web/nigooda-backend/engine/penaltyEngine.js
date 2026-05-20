// engine/penaltyEngine.js

const penaltyConfig =
  require("../config/penaltyConfig.json");

/* =========================================
   ✅ ADDED PATTERN PENALTY ENGINE
========================================= */

const patternPenalty =
  require("./patternPenaltyEngine");


/* =========================================
   SAFE NUMBER
========================================= */

function safeNumber(value) {

  if (
    typeof value !== "number" ||
    isNaN(value)
  ) {

    return 0;

  }

  return value;

}


/* =========================================
   CRITICAL PENALTIES
========================================= */

function calculateCriticalPenalties(
  ingredients
) {

  let total = 0;

  const rules =
    penaltyConfig.critical_penalties;


  for (let ingredient of ingredients) {

    const flags =
      ingredient.penalty_flags || {};


    if (flags.is_trans_fat) {

      total +=
        safeNumber(
          rules.trans_fat
        );

    }


    if (flags.is_artificial_dye) {

      total +=
        safeNumber(
          rules.artificial_dye
        );

    }


    if (flags.is_artificial_sweetener) {

      total +=
        safeNumber(
          rules.artificial_sweetener
        );

    }


    if (flags.is_hfcs) {

      total +=
        safeNumber(
          rules.hfcs
        );

    }

  }


  return Number(
    total.toFixed(2)
  );

}


/* =========================================
   PROCESSING PENALTIES
========================================= */

function calculateProcessingPenalties(
  processingData
) {

  let total = 0;

  const rules =
    penaltyConfig.processing_penalties;


  if (!processingData) {

    return 0;

  }


  const types =
    processingData.processing_types || [];


  for (let type of types) {

    if (rules[type]) {

      total +=
        safeNumber(
          rules[type]
        );

    }

  }


  // processing level penalty

  if (
    processingData.processing_level ===
    "moderate"
  ) {

    total +=
      safeNumber(
        rules.moderately_processed
      );

  }


  return Number(
    total.toFixed(2)
  );

}


/* =========================================
   MAIN FUNCTION
========================================= */

function applyAllPenalties({

  ingredients,

  ingredientNames,

  processingData

}) {

  /* =========================================
     CRITICAL
  ========================================= */

  const criticalPenalty =
    calculateCriticalPenalties(
      ingredients
    );


  /* =========================================
     PROCESSING
  ========================================= */

  const processingPenalty =
    calculateProcessingPenalties(
      processingData
    );


  /* =========================================
     ✅ PATTERN PENALTY (ADDED)
  ========================================= */

  const patternPenaltyValue =
    patternPenalty({

      ingredients,

      ingredientNames

    });


  /* =========================================
     TOTAL (UPDATED)
  ========================================= */

  const totalPenalty =
    Number(
      (
        criticalPenalty +
        processingPenalty +
        patternPenaltyValue
      ).toFixed(2)
    );


  /* =========================================
     VALIDATE
  ========================================= */

  if (
    typeof totalPenalty !== "number" ||
    isNaN(totalPenalty)
  ) {

    throw new Error(
      "Invalid totalPenalty calculated"
    );

  }


  return {

    critical_penalty:
      criticalPenalty,

    processing_penalty:
      processingPenalty,

    pattern_penalty:
      patternPenaltyValue,

    total_penalty:
      totalPenalty

  };

}


module.exports =
  applyAllPenalties;