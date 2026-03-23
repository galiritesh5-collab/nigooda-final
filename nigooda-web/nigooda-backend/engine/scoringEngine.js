// engine/scoringEngine.js

const categoryWeights =
  require("../config/categoryWeights.json");



/* =========================================
   VALID CATEGORY LIST
========================================= */

const VALID_CATEGORIES = [

  "additives",
  "preservatives",
  "sugars",
  "oils",
  "flavors",
  "colors",
  "stabilizers",
  "extracts",
  "animal",
  "whole"

];



/* =========================================
   Initialize Category Buckets
========================================= */

function initializeBuckets() {

  const buckets = {};

  for (let category of VALID_CATEGORIES) {

    buckets[category] = [];

  }

  return buckets;

}



/* =========================================
   Collect Ratings Into Buckets
========================================= */

function collectCategoryRatings(
  ingredients
) {

  const buckets =
    initializeBuckets();



  for (let ingredient of ingredients) {

    const categories =
      ingredient.categories;



    for (let category of VALID_CATEGORIES) {

      const rating =
        categories?.[category];



      if (
        rating &&
        rating > 0
      ) {

        buckets[category]
          .push(rating);

      }

    }

  }



  return buckets;

}



/* =========================================
   Calculate Category Averages
========================================= */

function calculateAverages(
  buckets
) {

  const averages = {};



  for (let category in buckets) {

    const values =
      buckets[category];



    if (values.length === 0) {

      // IGNORE EMPTY CATEGORY

      continue;

    }



    const sum =
      values.reduce(
        (a, b) => a + b,
        0
      );



    const average =
      sum / values.length;



    averages[category] =
      Number(
        average.toFixed(2)
      );

  }



  return averages;

}



/* =========================================
   Apply Category Weights
========================================= */

function applyWeights(
  averages
) {

  let weightedTotal = 0;

  let totalWeights = 0;



  for (let category in averages) {

    const weight =
      categoryWeights[
        category
      ] || 1;



    const score =
      averages[category];



    weightedTotal +=
      score * weight;



    totalWeights += weight;

  }



  if (totalWeights === 0) {

    return 0;

  }



  return Number(
    (
      weightedTotal /
      totalWeights
    ).toFixed(2)
  );

}



/* =========================================
   MAIN FUNCTION
========================================= */

function calculateScore(
  ingredientObjects
) {

  if (
    !Array.isArray(
      ingredientObjects
    )
  ) {

    throw new Error(
      "Ingredients must be array"
    );

  }



  // Step 1

  const buckets =
    collectCategoryRatings(
      ingredientObjects
    );



  // Step 2

  const categoryAverages =
    calculateAverages(
      buckets
    );



  // Step 3

  const weightedScore =
    applyWeights(
      categoryAverages
    );



  return {

    category_scores:
      categoryAverages,

    weighted_score:
      weightedScore,

    used_categories:
      Object.keys(
        categoryAverages
      )

  };

}



module.exports =
  calculateScore;