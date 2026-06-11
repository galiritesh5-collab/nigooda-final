const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/householdCare/airAndPestControl/airFreshener/ocrAndTypeDetection");

/*
=====================================================
AIR FRESHENER ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-airFreshener",

  async (req, res) => {

    try {

      console.log(
        "AIRFRESHENER ROUTE HIT"
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
        "AIRFRESHENER ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "AIRFRESHENER ANALYSIS ERROR:",
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
