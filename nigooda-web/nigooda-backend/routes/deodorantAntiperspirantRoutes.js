const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/bodyCare/deodorantAntiperspirant/ocrAndTypeDetection");

/*
=====================================================
DEODORANT / ANTIPERSPIRANT ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-deodorantAntiperspirant",

  async (req, res) => {

    try {

      console.log(
        "DEODORANTANTIPERSPIRANT ROUTE HIT"
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
        "DEODORANTANTIPERSPIRANT ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "DEODORANTANTIPERSPIRANT ANALYSIS ERROR:",
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
