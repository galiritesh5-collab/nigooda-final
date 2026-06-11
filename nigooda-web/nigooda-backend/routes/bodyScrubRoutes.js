const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/bodyCare/bodyScrub/ocrAndTypeDetection");

/*
=====================================================
BODY SCRUB ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-bodyScrub",

  async (req, res) => {

    try {

      console.log(
        "BODYSCRUB ROUTE HIT"
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
        "BODYSCRUB ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "BODYSCRUB ANALYSIS ERROR:",
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
