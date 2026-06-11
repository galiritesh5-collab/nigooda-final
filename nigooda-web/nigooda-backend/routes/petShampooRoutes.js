const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/petCare/petCleaning/petShampoo/ocrAndTypeDetection");

/*
=====================================================
PET SHAMPOO ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-petShampoo",

  async (req, res) => {

    try {

      console.log(
        "PETSHAMPOO ROUTE HIT"
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
        "PETSHAMPOO ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "PETSHAMPOO ANALYSIS ERROR:",
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
