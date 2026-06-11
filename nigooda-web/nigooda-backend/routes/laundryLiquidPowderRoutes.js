const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/householdCare/laundryCare/laundryLiquidPowder/ocrAndTypeDetection");

/*
=====================================================
LAUNDRY LIQUID / POWDER ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-laundryLiquidPowder",

  async (req, res) => {

    try {

      console.log(
        "LAUNDRYLIQUIDPOWDER ROUTE HIT"
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
        "LAUNDRYLIQUIDPOWDER ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "LAUNDRYLIQUIDPOWDER ANALYSIS ERROR:",
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
