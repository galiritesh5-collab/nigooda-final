const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/householdCare/homeCleaning/floorCleaner/ocrAndTypeDetection");

/*
=====================================================
FLOOR CLEANER ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-floorCleaner",

  async (req, res) => {

    try {

      console.log(
        "FLOORCLEANER ROUTE HIT"
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
        "FLOORCLEANER ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "FLOORCLEANER ANALYSIS ERROR:",
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
