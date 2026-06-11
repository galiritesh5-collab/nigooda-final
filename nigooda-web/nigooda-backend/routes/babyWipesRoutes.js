const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/babyCare/babyWipes/ocrAndTypeDetection");

/*
=====================================================
BABY WIPES ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-babyWipes",

  async (req, res) => {

    try {

      console.log(
        "BABYWIPES ROUTE HIT"
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
        "BABYWIPES ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "BABYWIPES ANALYSIS ERROR:",
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
