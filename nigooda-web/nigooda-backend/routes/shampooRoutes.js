const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/hairCare/shampoo/ocrAndTypeDetection");

/*
=====================================================
SHAMPOO ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-shampoo",

  async (req, res) => {

    try {

      console.log(
        "SHAMPOO ROUTE HIT"
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
        "SHAMPOO ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "SHAMPOO ANALYSIS ERROR:",
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