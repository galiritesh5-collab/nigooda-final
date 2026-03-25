// engine/finalRating.js



/* =========================================
   FINAL RATING CALCULATION
========================================= */

function calculateFinalRating({

  weightedScore,

  totalPenalty

}) {

  /* =========================================
     VALIDATE INPUTS
  ========================================= */

  if (
    typeof weightedScore !== "number" ||
    isNaN(weightedScore)
  ) {

    throw new Error(
      "Invalid weightedScore"
    );

  }



  if (
    typeof totalPenalty !== "number" ||
    isNaN(totalPenalty)
  ) {

    throw new Error(
      "Invalid totalPenalty"
    );

  }



  /* =========================================
     CALCULATE FINAL SCORE
  ========================================= */

  let finalRating =
    weightedScore +
    totalPenalty;



  /* =========================================
     CLAMP BETWEEN 1 AND 5
  ========================================= */

  if (finalRating < 1) {

    finalRating = 1;

  }

  if (finalRating > 5) {

    finalRating = 5;

  }



  /* =========================================
     ROUND TO 1 DECIMAL
  ========================================= */

  finalRating =
    Number(
      finalRating.toFixed(1)
    );



  return finalRating;

}



module.exports =
  calculateFinalRating;