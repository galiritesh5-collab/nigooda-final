const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/householdCare/homeCleaning/bathroomToiletCleaner/ocrAndTypeDetection");

/*
=====================================================
BATHROOM / TOILET CLEANER ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-bathroomToiletCleaner",

  async (req, res) => {

    try {

      console.log(
        "BATHROOMTOILETCLEANER ROUTE HIT"
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
        "BATHROOMTOILETCLEANER ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "BATHROOMTOILETCLEANER ANALYSIS ERROR:",
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
