const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/hairCare/hairMask/ocrAndTypeDetection");

/*
=====================================================
HAIR MASK ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-hairMask",

  async (req, res) => {

    try {

      console.log(
        "HAIR MASK ROUTE HIT"
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
        "HAIR MASK ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "HAIR MASK ANALYSIS ERROR:",
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
