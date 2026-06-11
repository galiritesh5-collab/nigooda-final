const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/petCare/petHealthAndTreatment/tickFleaTreatment/ocrAndTypeDetection");

/*
=====================================================
TICK / FLEA TREATMENT ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-tickFleaTreatment",

  async (req, res) => {

    try {

      console.log(
        "TICKFLEATREATMENT ROUTE HIT"
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
        "TICKFLEATREATMENT ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "TICKFLEATREATMENT ANALYSIS ERROR:",
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
