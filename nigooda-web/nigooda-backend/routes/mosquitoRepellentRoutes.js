const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/householdCare/airAndPestControl/mosquitoRepellent/ocrAndTypeDetection");

/*
=====================================================
MOSQUITO REPELLENT ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-mosquitoRepellent",

  async (req, res) => {

    try {

      console.log(
        "MOSQUITOREPELLENT ROUTE HIT"
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
        "MOSQUITOREPELLENT ENGINE COMPLETED"
      );

      return res.json({

        success: true,

        result,

      });

    }

    catch (error) {

      console.error(
        "MOSQUITOREPELLENT ANALYSIS ERROR:",
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
