const express =
  require("express");

const router =
  express.Router();

const OCRAndTypeDetection =
 require("../utils/intelligence/product/personalCare/skinCare/faceWash/ocrAndTypeDetection");

/*
=====================================================
FACE WASH ANALYSIS ROUTE
=====================================================
*/

router.post(
  "/analyze-facewash",

  async (req, res) => {

    try {

      console.log(
        "ROUTE HIT"
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
        "ENGINE COMPLETED"
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
        "FACE WASH ANALYSIS ERROR:",
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