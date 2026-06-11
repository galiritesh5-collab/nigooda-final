const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/hairCare/hairStylingProduct/ocrAndTypeDetection");

/*
=====================================================
HAIR STYLING PRODUCT ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-hairStylingProduct",

  async (req, res) => {

    try {

      console.log(
        "HAIR STYLING PRODUCT ROUTE HIT"
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
        "HAIR STYLING PRODUCT ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "HAIR STYLING PRODUCT ANALYSIS ERROR:",
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

