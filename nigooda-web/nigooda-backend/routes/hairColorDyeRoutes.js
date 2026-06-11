
const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/hairCare/hairColorDye/ocrAndTypeDetection");

/*
=====================================================
HAIR COLOR ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-hairColorDye",

  async (req, res) => {

    try {

      console.log(
        "HAIR COLOR ROUTE HIT"
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
        "HAIR COLOR ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "HAIR COLOR ANALYSIS ERROR:",
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