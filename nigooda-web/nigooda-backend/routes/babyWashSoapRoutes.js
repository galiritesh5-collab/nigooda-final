const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/babyCare/babyWashSoap/ocrAndTypeDetection");

/*
=====================================================
BABY WASH / SOAP ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-babyWashSoap",

  async (req, res) => {

    try {

      console.log(
        "BABYWASHSOAP ROUTE HIT"
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
        "BABYWASHSOAP ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "BABYWASHSOAP ANALYSIS ERROR:",
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
