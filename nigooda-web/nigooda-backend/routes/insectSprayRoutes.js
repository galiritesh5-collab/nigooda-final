const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/householdCare/airAndPestControl/insectSpray/ocrAndTypeDetection");

/*
=====================================================
INSECT SPRAY ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-insectSpray",

  async (req, res) => {

    try {

      console.log(
        "INSECTSPRAY ROUTE HIT"
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
        "INSECTSPRAY ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "INSECTSPRAY ANALYSIS ERROR:",
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
