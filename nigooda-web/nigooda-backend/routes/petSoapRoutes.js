const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/petCare/petCleaning/petSoap/ocrAndTypeDetection");

/*
=====================================================
PET SOAP ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-petSoap",

  async (req, res) => {

    try {

      console.log(
        "PETSOAP ROUTE HIT"
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
        "PETSOAP ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "PETSOAP ANALYSIS ERROR:",
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
