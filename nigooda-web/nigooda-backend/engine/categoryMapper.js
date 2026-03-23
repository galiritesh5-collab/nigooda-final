// engine/categoryMapper.js



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
   Clamp Rating
========================================= */

function clampRating(value) {

  if (typeof value !== "number") {

    return 0;

  }

  if (value < 1) {

    return 1;

  }

  if (value > 5) {

    return 5;

  }

  return Math.round(value);

}



/* =========================================
   Normalize Categories
========================================= */

function normalizeCategories(
  rawCategories
) {

  const normalized = {};



  for (let category of VALID_CATEGORIES) {

    let rating =
      rawCategories?.[category] || 0;



    if (rating !== 0) {

      rating =
        clampRating(rating);

    }



    // ⚠️ WHOLE category rule

    if (
      category === "whole" &&
      rating > 0 &&
      rating < 3
    ) {

      rating = 3;

    }



    normalized[category] =
      rating;

  }



  return normalized;

}



/* =========================================
   Check if Empty
========================================= */

function hasAnyCategory(
  categories
) {

  return Object.values(
    categories
  ).some(value => value > 0);

}



/* =========================================
   MAIN FUNCTION
========================================= */

function mapCategories(aiData) {

  if (!aiData.categories) {

    throw new Error(
      "AI response missing categories"
    );

  }



  const normalized =
    normalizeCategories(
      aiData.categories
    );



  if (
    !hasAnyCategory(normalized)
  ) {

    console.warn(
      "⚠️ No valid categories assigned"
    );

  }



  return normalized;

}



module.exports =
  mapCategories;