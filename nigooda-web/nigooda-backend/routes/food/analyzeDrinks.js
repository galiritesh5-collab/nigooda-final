const express =
require("express");

const router =
express.Router();

const DrinksEngine =
require("../../utils/intelligence/foodEngine/drinks/ocrAndTypeDetection")
/* =====================================
   ANALYZE DRINKS
===================================== */

router.post(
  "/analyze-drinks",

  async (req, res) => {

    try {

      const {
        imageBase64,
        pastedIngredients,
      } = req.body;

      const result =
        await DrinksEngine.run({

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
        "DRINK ANALYSIS ERROR:",
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
