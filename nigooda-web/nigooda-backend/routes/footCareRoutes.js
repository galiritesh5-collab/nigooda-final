const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/hygiene/footCare/ocrAndTypeDetection");

/*
=====================================================
FOOT CARE ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-footCare",

  async (req, res) => {

    try {

      console.log(
        "FOOTCARE ROUTE HIT"
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
        "FOOTCARE ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "FOOTCARE ANALYSIS ERROR:",
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
