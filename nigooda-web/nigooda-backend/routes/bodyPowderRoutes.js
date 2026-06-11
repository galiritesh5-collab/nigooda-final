const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/bodyCare/bodyPowder/ocrAndTypeDetection");

/*
=====================================================
BODY POWDER ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-bodyPowder",

  async (req, res) => {

    try {

      console.log(
        "BODYPOWDER ROUTE HIT"
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
        "BODYPOWDER ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "BODYPOWDER ANALYSIS ERROR:",
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
