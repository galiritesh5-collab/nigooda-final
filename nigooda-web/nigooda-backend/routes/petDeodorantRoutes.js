const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/petCare/petHygiene/petDeodorant/ocrAndTypeDetection");

/*
=====================================================
PET DEODORANT ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-petDeodorant",

  async (req, res) => {

    try {

      console.log(
        "PETDEODORANT ROUTE HIT"
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
        "PETDEODORANT ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "PETDEODORANT ANALYSIS ERROR:",
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
