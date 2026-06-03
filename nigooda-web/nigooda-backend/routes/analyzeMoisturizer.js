const express =
  require("express");

const router =
  express.Router();

const OCRAndTypeDetection =
  require("../utils/intelligence/product/personalCare/skinCare/moisturizer/ocrAndTypeDetection");

/*
=====================================================
MOISTURIZER ANALYSIS ROUTE
=====================================================
*/

router.post(
  "/analyze-moisturizer",

  async (req, res) => {

    try {

      console.log(
        "MOISTURIZER ROUTE HIT"
      );

      const {
        imageBase64,
        pastedIngredients,
      } = req.body;

      console.log(
        "BODY RECEIVED"
      );

      /*
      ================================================
      RUN ENGINE
      ================================================
      */

      const result =
        await OCRAndTypeDetection.run({

          imageBase64,

          pastedIngredients,

        });

      console.log(
        "MOISTURIZER ENGINE COMPLETED"
      );

      /*
      ================================================
      RESPONSE
      ================================================
      */

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "MOISTURIZER ANALYSIS ERROR:",
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