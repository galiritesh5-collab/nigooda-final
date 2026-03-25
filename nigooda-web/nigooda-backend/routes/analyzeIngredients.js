// routes/analyzeIngredients.js

const express = require("express");

const router = express.Router();



/* =========================================
   IMPORT ENGINES
========================================= */

const normalizeIngredients =
  require("../engine/normalization");

const lookupIngredient =
  require("../engine/ingredientLookup");

const calculateScore =
  require("../engine/scoringEngine");

const applyAllPenalties =
  require("../engine/penaltyEngine");

const getProcessingData =
  require("../engine/processingEngine");

const calculateFinalRating =
  require("../engine/finalRating");



/* =========================================
   MAIN ROUTE
========================================= */

router.post(
  "/analyze",
  async (req, res) => {

    try {

      const { ingredients } =
        req.body;



      if (
        !ingredients ||
        !Array.isArray(ingredients)
      ) {

        return res.status(400).json({

          error:
            "ingredients must be array"

        });

      }



      console.log(
        "📥 Ingredients received:",
        ingredients
      );



      /* =========================================
         STEP 1 — NORMALIZATION
      ========================================= */

      const normalized =
        normalizeIngredients(
          ingredients
        );



      console.log(
        "🧼 Normalized:",
        normalized
      );



      /* =========================================
         STEP 2 — INGREDIENT LOOKUP
      ========================================= */

      const ingredientObjects = [];



      for (let name of normalized) {

        const ingredient =
          await lookupIngredient(
            name
          );

        ingredientObjects.push(
          ingredient
        );

      }



      /* =========================================
         STEP 3 — PROCESSING
      ========================================= */

      const processingData =
        await getProcessingData(
          normalized
        );



      /* =========================================
         STEP 4 — SCORING
      ========================================= */

      const scoreData =
        calculateScore(
          ingredientObjects
        );



      /* =========================================
         STEP 5 — PENALTIES
      ========================================= */

      const penaltyData =
        applyAllPenalties({

          ingredients:
            ingredientObjects,

          ingredientNames:
            normalized,

          processingData

        });



      /* =========================================
         STEP 6 — FINAL RATING
      ========================================= */

      const finalRating =
        calculateFinalRating({

          weightedScore:
            scoreData.weighted_score,

          totalPenalty:
            penaltyData.total_penalty

        });



      /* =========================================
         FINAL RESPONSE
      ========================================= */

      return res.json({

        normalized_ingredients:
          normalized,

        processing:
          processingData,

        category_scores:
          scoreData.category_scores,

        weighted_score:
          scoreData.weighted_score,

        penalties:
          penaltyData,

        final_rating:
          finalRating

      });

    }

    catch (error) {

      console.error(
        "❌ Analyze Error:",
        error
      );



      return res.status(500).json({

        error:
          "Analysis failed",

        details:
          error.message

      });

    }

  }

);



module.exports = router;