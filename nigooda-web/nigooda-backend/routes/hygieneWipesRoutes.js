const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/hygiene/hygieneWipes/ocrAndTypeDetection");

/*
=====================================================
HYGIENE WIPES ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-hygieneWipes",

  async (req, res) => {

    try {

      console.log(
        "HYGIENEWIPES ROUTE HIT"
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
        "HYGIENEWIPES ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "HYGIENEWIPES ANALYSIS ERROR:",
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
