const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/babyCare/babyShampoo/ocrAndTypeDetection");

/*
=====================================================
BABY SHAMPOO ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-babyShampoo",

  async (req, res) => {

    try {

      console.log(
        "BABYSHAMPOO ROUTE HIT"
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
        "BABYSHAMPOO ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "BABYSHAMPOO ANALYSIS ERROR:",
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
