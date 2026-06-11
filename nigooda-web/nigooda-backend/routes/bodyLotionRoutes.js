const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/bodyCare/bodyLotion/ocrAndTypeDetection");

/*
=====================================================
BODY LOTION ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-bodyLotion",

  async (req, res) => {

    try {

      console.log(
        "BODYLOTION ROUTE HIT"
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
        "BODYLOTION ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "BODYLOTION ANALYSIS ERROR:",
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
