
const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/hairCare/hairOil/ocrAndTypeDetection");

/*
=====================================================
HAIR OIL ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-hairOil",

  async (req, res) => {

    try {

      console.log(
        "HAIR OIL ROUTE HIT"
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
        "HAIR OIL ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "HAIR OIL ANALYSIS ERROR:",
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

