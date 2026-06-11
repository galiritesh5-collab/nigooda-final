const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/hygiene/antisepticLiquid/ocrAndTypeDetection");

/*
=====================================================
ANTISEPTIC LIQUID ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-antisepticLiquid",

  async (req, res) => {

    try {

      console.log(
        "ANTISEPTICLIQUID ROUTE HIT"
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
        "ANTISEPTICLIQUID ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "ANTISEPTICLIQUID ANALYSIS ERROR:",
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
