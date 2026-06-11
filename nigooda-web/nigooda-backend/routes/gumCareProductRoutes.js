const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/oralCare/gumCareProduct/ocrAndTypeDetection");

/*
=====================================================
GUM CARE PRODUCT ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-gumCareProduct",

  async (req, res) => {

    try {

      console.log(
        "GUMCAREPRODUCT ROUTE HIT"
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
        "GUMCAREPRODUCT ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "GUMCAREPRODUCT ANALYSIS ERROR:",
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
