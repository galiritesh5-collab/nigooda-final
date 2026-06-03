const express =
  require("express");

const router =
  express.Router();

const OCRAndTypeDetection =
  require("../utils/intelligence/product/personalCare/skinCare/serum/ocrAndTypeDetection");

/*
=====================================================
SERUM ANALYSIS ROUTE
=====================================================
*/

router.post(
  "/analyze-serum",

  async (req, res) => {

    try {

      console.log(
        "SERUM ROUTE HIT"
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
        "SERUM ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "SERUM ANALYSIS ERROR:",
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