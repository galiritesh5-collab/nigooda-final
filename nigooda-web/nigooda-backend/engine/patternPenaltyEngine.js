// engine/patternPenaltyEngine.js



function calculatePatternPenalties({

  ingredients,

  ingredientNames

}) {

  let total = 0;



  /* =========================
     MULTIPLE SUGARS
  ========================= */

  const sugarCount =
    ingredients.filter(i =>

      i.categories?.sugars > 0

    ).length;



  if (sugarCount >= 2) {

    total -= 0.4;

  }



  /* =========================
     SUGAR FIRST
  ========================= */

  if (

    ingredients[0]?.categories
      ?.sugars > 0

  ) {

    total -= 0.6;

  }



  /* =========================
     HIGH SODIUM
  ========================= */

  const sodiumKeywords = [

    "salt",
    "sodium"
  ];



  const sodiumFound =
    ingredientNames.some(name =>

      sodiumKeywords.some(k =>

        name.includes(k)

      )

    );



  if (sodiumFound) {

    total -= 0.3;

  }



  return Number(
    total.toFixed(2)
  );

}



module.exports =
  calculatePatternPenalties;