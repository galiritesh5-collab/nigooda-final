const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/hygiene/handSanitizer/ocrAndTypeDetection");

/*
=====================================================
HAND SANITIZER ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-handSanitizer",

  async (req, res) => {

    try {

      console.log(
        "HANDSANITIZER ROUTE HIT"
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
        "HANDSANITIZER ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "HANDSANITIZER ANALYSIS ERROR:",
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
