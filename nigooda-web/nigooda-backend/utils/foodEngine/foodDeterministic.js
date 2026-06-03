/*
===========================================================
NIGOODA DETERMINISTIC ENGINE
===========================================================

DETERMINISTIC RESPONSIBILITIES

1. Positional Weight System
2. Category Weight System
3. Positional Category Boosts
4. Weighted Ingredient Score
5. Critical Ingredient Penalties
6. Processing Penalties
7. Additional Penalties
8. Bonus Application
9. Final Rating Calculation

===========================================================

THIS FILE DOES:
- mathematical scoring
- deterministic rules
- positional weighting
- category weighting
- penalty calculations
- score normalization
- final rating generation

THIS FILE DOES NOT:
- semantic reasoning
- ingredient understanding
- AI classification
- AI processing analysis

===========================================================
*/

class FoodDeterministic {
  constructor() {
    /*
    =======================================================
    CATEGORY BASE WEIGHTS
    =======================================================
    */

    this.categoryWeights = {
      additives: 1.4,
      preservatives: 1.3,
      sugars: 1.3,
      oils: 1.2,
      flavors: 1.2,
      colors: 1.3,
      stabilizers: 1.1,
      extracts: 1.0,
      animal: 1.0,
      whole_ingredients: 0.9,
    };

    /*
    =======================================================
    CRITICAL PENALTIES
    =======================================================
    */

   this.criticalPenaltyMap = {

  trans_fat_source: {
    type: "trans_fat",
    penalty: -1.2,
  },

  artificial_color: {
    type: "artificial_color",
    penalty: -0.8,
  },

  artificial_sweetener: {
    type: "artificial_sweetener",
    penalty: -0.7,
  },

  refined_oil: {
    type: "refined_oil",
    penalty: -0.45,
  },

  refined_carb_base: {
    type: "refined_carb_base",
    penalty: -0.4,
  },

  flavor_enhancer: {
    type: "flavor_enhancer",
    penalty: -0.55,
  },

  additive_load_candidate: {
    type: "additive_load",
    penalty: -0.45,
  },

  high_sugar_risk: {
    type: "high_sugar_risk",
    penalty: -0.4,
  },

  ultra_processed_indicator: {
    type: "ultra_processed",
    penalty: -0.35,
  },
};

    /*
    =======================================================
    PROCESSING PENALTIES
    =======================================================
    */

    this.processingPenaltyMap = {
      deep_fried: {
        type: "deep_fried",
        penalty: -0.8,
      },

      extruded_fried_snack: {
        type: "extruded_fried_snack",
        penalty: -0.9,
      },

      refined_oil_frying: {
        type: "refined_oil_frying",
        penalty: -0.3,
      },

      moderately_processed: {
        type: "moderately_processed",
        penalty: -0.3,
      },
    };

    /*
    =======================================================
    PENALTY DECAY MULTIPLIERS
    =======================================================
    */

    this.penaltyDecay = [
      1.0,
      0.9,
      0.8,
      0.7,
      0.6,
      0.5,
    ];
  }

  /*
  ===========================================================
  MAIN EXECUTION PIPELINE
  ===========================================================
  */

  run(aiOutput) {
    /*
    =======================================================
    STEP 1 — POSITIONAL WEIGHTS
    =======================================================
    */

    let ingredients =
  this.applyPositionalWeights(
    aiOutput.ingredients
  );

ingredients =
    this.applyProcessingContextAdjustment(
      ingredients,
      aiOutput.processing_analysis
    );
    /*
    =======================================================
    STEP 2 — CATEGORY SCORES
    =======================================================
    */

    const categoryScores =
      this.calculateCategoryScores(
        ingredients
      );

    /*
    =======================================================
    STEP 3 — CATEGORY WEIGHTS
    =======================================================
    */

    const boostedWeights =
      this.calculateBoostedCategoryWeights(
        ingredients
      );

    /*
    =======================================================
    STEP 4 — WEIGHTED SCORE
    =======================================================
    */

    const weightedIngredientScore =
      this.calculateWeightedIngredientScore({
        categoryScores,
        boostedWeights,
      });

    /*
    =======================================================
    STEP 5 — CRITICAL PENALTIES
    =======================================================
    */

    const criticalPenalties =
      this.calculateCriticalPenalties(
        ingredients
      );

    /*
    =======================================================
    STEP 6 — PROCESSING PENALTIES
    =======================================================
    */

    const processingPenalties =
      this.calculateProcessingPenalties(
        aiOutput.processing_analysis
      );

    /*
    =======================================================
    STEP 7 — ADDITIONAL PENALTIES
    =======================================================
    */

    const additionalPenalties =
      this.calculateAdditionalPenalties(
        ingredients
      );

    /*
    =======================================================
    STEP 8 — BONUS VALUES
    =======================================================
    */

    const bonuses =
      this.calculateBonuses(
        aiOutput.bonuses || []
      );

    /*
    =======================================================
    STEP 9 — FINAL RATING
    =======================================================
    */

    const finalRating =
      this.calculateFinalRating({
        weightedIngredientScore,
        criticalPenalties,
        processingPenalties,
        additionalPenalties,
        bonuses,
      });

    /*
    =======================================================
    FINAL OUTPUT
    =======================================================
    */

    return {
      ...aiOutput,

      ingredients,

      category_scores: categoryScores,

      weighted_ingredient_score:
        Number(
          weightedIngredientScore.toFixed(2)
        ),

      penalties: [
        ...criticalPenalties,
        ...processingPenalties,
        ...additionalPenalties,
      ],

      bonuses,

      final_rating: Number(
        finalRating.toFixed(2)
      ),
      quality_label:
  this.getQualityLabel(
    finalRating
  ),
    };
  }

  /*
  ===========================================================
  STEP 1 — POSITIONAL WEIGHTS
  ===========================================================
  */

  applyPositionalWeights(ingredients) {
    const total = ingredients.length;

    return ingredients.map(
      (ingredient, index) => {
        const position = index + 1;

        let positionPercentage =
          (position / total) * 100;

        let positionBand = "";
        let positionWeight = 1;

        /*
        =====================================================
        MINIMUM POSITION BAND RULE
        =====================================================
        */

      if (total <= 4) {

  if (position === 1) {

    positionBand = "top_25";
    positionWeight = 1.5;

  }

  else if (position === 2) {

    positionBand = "25_50";
    positionWeight = 1.25;

  }

  else if (position === 3) {

    positionBand = "50_75";
    positionWeight = 1.0;

  }

  else {

    positionBand =
      "bottom_25";

    positionWeight = 0.75;

  }

}

/*
=====================================================
NORMAL BAND RULES
=====================================================
*/

else {

  if (
    positionPercentage <= 25
  ) {

    positionBand =
      "top_25";

    positionWeight = 1.5;

  }

  else if (
    positionPercentage <= 50
  ) {

    positionBand =
      "25_50";

    positionWeight = 1.25;

  }

  else if (
    positionPercentage <= 75
  ) {

    positionBand =
      "50_75";

    positionWeight = 1.0;

  }

  else {

    positionBand =
      "bottom_25";

    positionWeight = 0.75;

  }

}

return {

  ...ingredient,

  position,

  position_percentage:
    Number(
      positionPercentage.toFixed(2)
    ),

  position_band:
    positionBand,

  position_weight:
    positionWeight,

};

      }
    );
  }

  /*
  ===========================================================
  PROCESSING CONTEXT ADJUSTMENT
  ===========================================================
  */

  applyProcessingContextAdjustment(
    ingredients,
    processingAnalysis
  ) {

    const processingTypes =
      processingAnalysis?.types || [];

    const aggressiveProcessing =
      processingTypes.some(
        (type) =>
          [
            "extruded_fried_snack",
            "deep_fried",
            "industrial_processing",
          ].includes(type)
      );

    if (!aggressiveProcessing) {
      return ingredients;
    }

    return ingredients.map(
      (ingredient) => {

        const categories =
          ingredient.categories || {};

        if (
          categories.whole_ingredients >= 4
        ) {

          const refinedSnackBase =
            ingredient.penalty_triggers
              ?.refined_carb_base;

          if (refinedSnackBase) {

            categories.whole_ingredients =
              Math.max(
                2.5,
                categories.whole_ingredients - 1.5
              );

          }

        }

        return {
          ...ingredient,
          categories,
        };

      }
    );
  }

  /*
  ===========================================================
  STEP 2 — POSITIONAL CATEGORY SCORES
  ===========================================================
  */

calculateCategoryScores(
  ingredients
) {

  const categoryMap = {};

  ingredients.forEach(
    (ingredient) => {

      const categories =
        ingredient.categories || {};

      Object.entries(
        categories
      ).forEach(
        ([category, score]) => {

          const normalizedCategory =
            category
              .toLowerCase()
              .replace(/\s+/g, "_");

          if (
            !categoryMap[
              normalizedCategory
            ]
          ) {

            categoryMap[
              normalizedCategory
            ] = [];

          }

          categoryMap[
            normalizedCategory
          ].push({
            score,
            weight:
              ingredient.position_weight,
          });

        }
      );
    }
  );

  const finalScores = {};

  Object.entries(
    categoryMap
  ).forEach(
    ([category, entries]) => {

      let numerator = 0;
      let denominator = 0;

      entries.forEach(
        (entry) => {

          numerator +=
            entry.score *
            entry.weight;

          denominator +=
            entry.weight;

        }
      );

      finalScores[
        category
      ] =
        numerator / denominator;

    }
  );

  return finalScores;
}

  /*
  ===========================================================
  STEP 3 — CATEGORY WEIGHT BOOSTS
  ===========================================================
  */

  calculateBoostedCategoryWeights(
    ingredients
  ) {
    const boosted = {
      ...this.categoryWeights,
    };

    Object.keys(
      this.categoryWeights
    ).forEach((category) => {
      const topIngredients =
        ingredients.filter(
          (ingredient) =>
            ingredient.categories?.[
              category
            ] &&
            ingredient.position_band ===
              "top_25"
        );

      if (
        topIngredients.length >= 2
      ) {
        boosted[category] =
          this.categoryWeights[
            category
          ] * 1.35;
      }

      else if (
        topIngredients.length >= 1
      ) {
        boosted[category] =
          this.categoryWeights[
            category
          ] * 1.2;
      }

      /*
      =====================================================
      BOOST LIMIT RULE
      =====================================================
      */

      const maxBoost =
        this.categoryWeights[
          category
        ] * 1.35;

      if (
        boosted[category] >
        maxBoost
      ) {
        boosted[category] =
          maxBoost;
      }
    });

    return boosted;
  }

  /*
  ===========================================================
  STEP 4 — WEIGHTED INGREDIENT SCORE
  ===========================================================
  */

  calculateWeightedIngredientScore({
    categoryScores,
    boostedWeights,
  }) {
    let numerator = 0;
    let denominator = 0;

    Object.entries(
      categoryScores
    ).forEach(
      ([category, score]) => {
        /*
        =====================================================
        CATEGORY EXCLUSION RULE
        =====================================================
        */

        if (
          boostedWeights[
            category
          ] !== undefined
        ) {
          numerator +=
            score *
            boostedWeights[
              category
            ];

          denominator +=
            boostedWeights[
              category
            ];
        }
      }
    );

    if (denominator === 0) {
      return 0;
    }

    return numerator / denominator;
  }

  /*
  ===========================================================
  STEP 5 — CRITICAL PENALTIES
  ===========================================================
  */

  calculateCriticalPenalties(
    ingredients
  ) {
    const penalties = [];

    ingredients.forEach(
      (ingredient) => {
        const triggers =
          ingredient.penalty_triggers ||
          {};

        Object.keys(triggers).forEach(
          (trigger) => {
            const config =
              this
                .criticalPenaltyMap[
                trigger
              ];

            if (config) {
              /*
              ===============================================
              PENALTY POSITION LIMIT RULE
              ===============================================
              */

              const penaltyWeight =
                Math.min(
                  ingredient.position_weight,
                  1.25
                );

              penalties.push({
                type: config.type,

                penalty:
                  config.penalty *
                  penaltyWeight,
              });
            }
          }
        );
      }
    );

    return penalties;
  }

  /*
  ===========================================================
  STEP 6 — PROCESSING PENALTIES
  ===========================================================
  */

  calculateProcessingPenalties(
    processingAnalysis
  ) {
    const penalties = [];

    const types =
      processingAnalysis.types ||
      [];

    types.forEach((type) => {
      const config =
        this.processingPenaltyMap[
          type
        ];

      if (config) {
        penalties.push({
          type: config.type,

          penalty:
            config.penalty,
        });
      }
    });

    return penalties;
  }

  /*
  ===========================================================
  STEP 7 — ADDITIONAL PENALTIES
  ===========================================================
  */

  calculateAdditionalPenalties(
    ingredients
  ) {
    const penalties = [];

    /*
    =======================================================
    MULTIPLE SUGARS
    =======================================================
    */

    const sugarIngredients =
      ingredients.filter(
        (ingredient) =>
          ingredient
            .penalty_triggers
            ?.multiple_sugar_candidate
      );

    if (
      sugarIngredients.length >= 2
    ) {
      const avgWeight =
        sugarIngredients.reduce(
          (sum, ingredient) =>
            sum +
            ingredient.position_weight,
          0
        ) /
        sugarIngredients.length;

      let penalty =
        -0.4 * avgWeight;

      const topHalfCount =
        sugarIngredients.filter(
          (ingredient) =>
            ingredient
              .position_percentage <=
            50
        ).length;

      if (
        topHalfCount >= 3
      ) {
        penalty -= 0.2;
      }

      /*
      =====================================================
      CAP RULE
      =====================================================
      */

      if (penalty < -0.7) {
        penalty = -0.7;
      }

      penalties.push({
        type: "multiple_sugars",

        penalty,
      });
    }

    /*
    =======================================================
    HIGH SODIUM
    =======================================================
    */

    ingredients.forEach(
      (ingredient) => {
        if (
          ingredient
            .normalized_name &&
          [
            "salt",
            "sodium chloride",
            "sodium bicarbonate",
            "sodium phosphate",
          ].includes(
            ingredient.normalized_name
          )
        ) {
          let penalty = -0.1;

          if (
            ingredient.position_band ===
            "top_25"
          ) {
            penalty = -0.4;
          }

          else if (
            ingredient.position_band ===
            "25_50"
          ) {
            penalty = -0.3;
          }

          else if (
            ingredient.position_band ===
            "50_75"
          ) {
            penalty = -0.2;
          }

          penalties.push({
            type: "high_sodium",

            penalty,
          });
        }
      }
    );

    /*
    =======================================================
    REFINED STARCH BASE
    =======================================================
    */

    const refinedBase =
      ingredients.find(
        (ingredient) =>
          ingredient
            .penalty_triggers
            ?.refined_carb_base
      );

    if (refinedBase) {
      let penalty = -0.2;

      if (
        refinedBase.position_band ===
        "top_25"
      ) {
        penalty = -0.5;
      }

      else if (
        refinedBase.position_band ===
        "25_50"
      ) {
        penalty = -0.4;
      }

      else if (
        refinedBase.position_band ===
        "50_75"
      ) {
        penalty = -0.3;
      }

      penalties.push({
        type:
          "refined_carb_base",

        penalty,
      });
    }

    /*
    =======================================================
    ADDITIVE LOAD
    =======================================================
    */

    let additiveLoad = 0;

    ingredients.forEach(
      (ingredient) => {
        if (
          ingredient
            .penalty_triggers
            ?.additive_load_candidate
        ) {
          additiveLoad +=
            ingredient.position_weight;
        }
      }
    );

    if (additiveLoad >= 5) {
      penalties.push({
        type: "additive_load",

        penalty: -0.6,
      });
    }

    else if (
      additiveLoad >= 3
    ) {
      penalties.push({
        type: "additive_load",

        penalty: -0.4,
      });
    }
    /*
=======================================================
FLAVOR ENHANCER STACK
=======================================================
*/

const flavorEnhancers =
  ingredients.filter(
    (ingredient) =>
      ingredient
        .penalty_triggers
        ?.flavor_enhancer
  );

if (
  flavorEnhancers.length >= 2
) {

  penalties.push({
    type:
      "flavor_enhancer_stack",

    penalty: -0.7,
  });

}

else if (
  flavorEnhancers.length >= 1
) {

  penalties.push({
    type:
      "flavor_enhancer_stack",

    penalty: -0.4,
  });

}

    /*
    =======================================================
    ULTRA PROCESSED PATTERN
    =======================================================
    */

    let ultraScore = 0;

const countedIngredients =
  new Set();

ingredients.forEach(
  (ingredient) => {

    const ingredientKey =
      ingredient.normalized_name;

    if (
      ingredient
        .penalty_triggers
        ?.ultra_processed_indicator &&
      !countedIngredients.has(
        ingredientKey
      )
    ) {

      countedIngredients.add(
        ingredientKey
      );

      ultraScore +=
        ingredient.position_weight;
    }
  }
);

    if (ultraScore >= 8) {
      penalties.push({
        type:
          "ultra_processed_pattern",

        penalty: -0.9,
      });
    }

    else if (
      ultraScore >= 6
    ) {
      penalties.push({
        type:
          "ultra_processed_pattern",

        penalty: -0.7,
      });
    }

    else if (
      ultraScore >= 4
    ) {
      penalties.push({
        type:
          "ultra_processed_pattern",

        penalty: -0.5,
      });
    }

    else if (
      ultraScore >= 2.5
    ) {
      penalties.push({
        type:
          "ultra_processed_pattern",

        penalty: -0.3,
      });
    }

    /*
    =======================================================
    SUGAR FIRST
    =======================================================
    */

    const firstIngredient =
      ingredients[0];

    if (
      firstIngredient
        ?.penalty_triggers
        ?.multiple_sugar_candidate
    ) {
      penalties.push({
        type: "sugar_first",

        penalty: -0.6,
      });
    }

    return penalties;
  }

  /*
  ===========================================================
  STEP 8 — BONUS VALUES
  ===========================================================
  */

  calculateBonuses(bonuses) {
    const bonusMap = {
      natural_spices: 0.2,
      whole_seeds: 0.2,
      fermented_ingredients:
        0.3,
      whole_foods: 0.3,
      low_ingredient_complexity:
        0.2,
      no_additives: 0.2,
      no_added_sugars: 0.3,
    };

    return bonuses.map(
      (bonus) => ({
        type: bonus.type,

        bonus:
          bonusMap[
            bonus.type
          ] || 0,
      })
    );
  }
getQualityLabel(score) {

  if (score >= 4.5)
    return "Excellent";

  if (score >= 4.0)
    return "Very Good";

  if (score >= 3.5)
    return "Good";

  if (score >= 2.5)
    return "Moderate";

  if (score >= 1.5)
    return "Poor";

  return "Very Poor";
}
  /*
  ===========================================================
  STEP 9 — FINAL RATING
  ===========================================================
  */

  calculateFinalRating({
    weightedIngredientScore,
    criticalPenalties,
    processingPenalties,
    additionalPenalties,
    bonuses,
  }) {
    let score =
      weightedIngredientScore;

    /*
    =======================================================
    PENALTY APPLICATION ORDER
    =======================================================
    */

    const allPenalties = [
      ...criticalPenalties,
      ...processingPenalties,
      ...additionalPenalties,
    ];

    /*
    =======================================================
    PROGRESSIVE PENALTY DECAY
    =======================================================
    */

    allPenalties.forEach(
      (penalty, index) => {
        const decay =
          this.penaltyDecay[
            index
          ] || 0.5;

        score +=
          penalty.penalty *
          decay;
      }
    );

    /*
    =======================================================
    BONUS APPLICATION
    =======================================================
    */

    bonuses.forEach((bonus) => {
      score += bonus.bonus;
    });

    /*
    =======================================================
    SCORE NORMALIZATION
    =======================================================
    */

    if (score < 1) {
      score = 1;
    }

    if (score > 5) {
      score = 5;
    }

    return score;
  }
}

module.exports =
  new FoodDeterministic();

