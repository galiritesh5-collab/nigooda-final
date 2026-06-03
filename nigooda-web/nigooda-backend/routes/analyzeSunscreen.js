const express =
  require("express");

const router =
  express.Router();

const OCRAndTypeDetection =
  require("../utils/intelligence/product/personalCare/skinCare/sunscreen/ocrAndTypeDetection");

/*
=====================================================
SUNSCREEN ANALYSIS ROUTE
=====================================================
*/

router.post(
  "/analyze-sunscreen",

  async (req, res) => {

    try {

      console.log(
        "SUNSCREEN ROUTE HIT"
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
        "SUNSCREEN ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "SUNSCREEN ANALYSIS ERROR:",
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