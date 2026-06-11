const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/hygiene/intimateWash/ocrAndTypeDetection");

/*
=====================================================
INTIMATE WASH ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-intimateWash",

  async (req, res) => {

    try {

      console.log(
        "INTIMATEWASH ROUTE HIT"
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
        "INTIMATEWASH ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "INTIMATEWASH ANALYSIS ERROR:",
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
