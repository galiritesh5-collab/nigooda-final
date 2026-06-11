const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/babyCare/babyPowder/ocrAndTypeDetection");

/*
=====================================================
BABY POWDER ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-babyPowder",

  async (req, res) => {

    try {

      console.log(
        "BABYPOWDER ROUTE HIT"
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
        "BABYPOWDER ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "BABYPOWDER ANALYSIS ERROR:",
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
