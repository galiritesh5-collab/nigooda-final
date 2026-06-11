const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/petCare/petHygiene/petGroomingSpray/ocrAndTypeDetection");

/*
=====================================================
PET GROOMING SPRAY ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-petGroomingSpray",

  async (req, res) => {

    try {

      console.log(
        "PETGROOMINGSPRAY ROUTE HIT"
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
        "PETGROOMINGSPRAY ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "PETGROOMINGSPRAY ANALYSIS ERROR:",
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
