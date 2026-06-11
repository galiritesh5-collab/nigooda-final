const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/householdCare/kitchenCare/dishwashCleaner/ocrAndTypeDetection");

/*
=====================================================
DISHWASH CLEANER ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-dishwashCleaner",

  async (req, res) => {

    try {

      console.log(
        "DISHWASHCLEANER ROUTE HIT"
      );

      const {
        imageBase64,
        pastedIngredients,
      } = req.body;

      const result =
        await OCRAndTypeDetection.run({

          imageBase64,

          pastedIngredients,

        });

      console.log(
        "DISHWASHCLEANER ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "DISHWASHCLEANER ANALYSIS ERROR:",
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
