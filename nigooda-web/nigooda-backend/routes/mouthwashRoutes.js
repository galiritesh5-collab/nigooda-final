const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/oralCare/mouthwash/ocrAndTypeDetection");

/*
=====================================================
MOUTHWASH ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-mouthwash",

  async (req, res) => {

    try {

      console.log(
        "MOUTHWASH ROUTE HIT"
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
        "MOUTHWASH ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "MOUTHWASH ANALYSIS ERROR:",
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
