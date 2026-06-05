const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require(
  "../utils/intelligence/product/personalCare/hairCare/conditioner/ocrAndTypeDetection"
);

/*
=====================================================
CONDITIONER ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-conditioner",

  async (req, res) => {

    try {

      console.log(
        "CONDITIONER ROUTE HIT"
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
        "CONDITIONER ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "CONDITIONER ANALYSIS ERROR:",
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