const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/oralCare/toothpasteToothPowder/ocrAndTypeDetection");

/*
=====================================================
TOOTHPASTE / TOOTH POWDER ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-toothpasteToothPowder",

  async (req, res) => {

    try {

      console.log(
        "TOOTHPASTETOOTHPOWDER ROUTE HIT"
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
        "TOOTHPASTETOOTHPOWDER ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "TOOTHPASTETOOTHPOWDER ANALYSIS ERROR:",
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
