const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/babyCare/babyOil/ocrAndTypeDetection");

/*
=====================================================
BABY OIL ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-babyOil",

  async (req, res) => {

    try {

      console.log(
        "BABYOIL ROUTE HIT"
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
        "BABYOIL ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "BABYOIL ANALYSIS ERROR:",
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
