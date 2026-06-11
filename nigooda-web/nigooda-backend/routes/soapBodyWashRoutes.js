const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/bodyCare/soapBodyWash/ocrAndTypeDetection");

/*
=====================================================
SOAP BODY WASH ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-soapBodyWash",

  async (req, res) => {

    try {

      console.log(
        "SOAP BODY WASH ROUTE HIT"
      );

      const {
        imageBase64,
        pastedIngredients,
      } = req.body;

      /*
      =============================================
      VALIDATION
      =============================================
      */

      if (
        !imageBase64 &&
        !pastedIngredients
      ) {

        return res.status(400).json({

          success: false,

          error:
            "No input provided"

        });

      }

      /*
      =============================================
      OCR + ANALYSIS ENGINE
      =============================================
      */

      const result =
        await OCRAndTypeDetection.run({

          imageBase64,

          pastedIngredients,

        });

      console.log(
        "SOAP BODY WASH ENGINE COMPLETED"
      );

      /*
      =============================================
      SUCCESS RESPONSE
      =============================================
      */

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "SOAP BODY WASH ANALYSIS ERROR:",
        error
      );

      /*
      =============================================
      ERROR RESPONSE
      =============================================
      */

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