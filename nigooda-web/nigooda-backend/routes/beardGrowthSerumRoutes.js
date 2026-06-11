
const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/hairCare/beardGrowthSerum/ocrAndTypeDetection");

/*
=====================================================
BEARD GROWTH SERUM ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-beardGrowthSerum",

  async (req, res) => {

    try {

      console.log(
        "BEARD GROWTH SERUM ROUTE HIT"
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
        "BEARD GROWTH SERUM ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "BEARD GROWTH SERUM ANALYSIS ERROR:",
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

