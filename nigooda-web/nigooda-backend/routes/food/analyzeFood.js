const express =
require("express");

const router =
express.Router();

const FinalFoodAnalysis =
require("../../utils/foodEngine/finalFoodAnalysis");

/*
=====================================================
FOOD ANALYSIS ROUTE
=====================================================
*/

router.post(
  "/analyze-food",

  async (req, res) => {

    try {

      console.log(
        "FOOD ROUTE HIT"
      );

      const {
        pastedIngredients,
        extractedIngredients,
        nutritionData,
        productName,
      } = req.body;

      const ingredients =
        extractedIngredients ||
        pastedIngredients;

      if (!ingredients) {

        return res.status(400).json({

          success: false,

          error:
            "Ingredients required",

        });

      }

      const result =
        await FinalFoodAnalysis.run({

          ingredients,

          nutritionData,

          productName,

        });

      console.log(
        "FOOD ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "FOOD ANALYSIS ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        error:
          error.message,

      });

    }

  }
);

module.exports =
router;