const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/oralCare/teethWhiteningProduct/ocrAndTypeDetection");

/*
=====================================================
TEETH WHITENING PRODUCT ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-teethWhiteningProduct",

  async (req, res) => {

    try {

      console.log(
        "TEETHWHITENINGPRODUCT ROUTE HIT"
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
        "TEETHWHITENINGPRODUCT ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "TEETHWHITENINGPRODUCT ANALYSIS ERROR:",
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
