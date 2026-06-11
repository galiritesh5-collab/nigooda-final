const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/householdCare/laundryCare/laundrySoap/ocrAndTypeDetection");

/*
=====================================================
LAUNDRY SOAP ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-laundrySoap",

  async (req, res) => {

    try {

      console.log(
        "LAUNDRYSOAP ROUTE HIT"
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
        "LAUNDRYSOAP ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "LAUNDRYSOAP ANALYSIS ERROR:",
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
