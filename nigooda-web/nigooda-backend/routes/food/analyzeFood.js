const express =
require("express");

const router =
express.Router();

const FoodEngine =
require("../../utils/intelligence/foodEngine/foods/ocrAndTypeDetection");

router.post(
  "/analyze-foods",

  async (req, res) => {

    try {

      const {
        imageBase64,
        pastedIngredients,
      } = req.body;

      const result =
        await FoodEngine.run({

          imageBase64,

          pastedIngredients,

        });

      res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "FOOD ANALYSIS ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        error:
          error.message,

      });

    }

  }
);

module.exports =
router;
