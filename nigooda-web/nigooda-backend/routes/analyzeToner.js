const express =
  require("express");

const router =
  express.Router();

const OCRAndTypeDetection =
  require("../utils/intelligence/product/personalCare/skinCare/toner/ocrAndTypeDetection");

/*
=====================================================
TONER ANALYSIS ROUTE
=====================================================
*/

router.post(
  "/analyze-toner",

  async (req, res) => {

    try {

      console.log(
        "TONER ROUTE HIT"
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
        "TONER ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "TONER ANALYSIS ERROR:",
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