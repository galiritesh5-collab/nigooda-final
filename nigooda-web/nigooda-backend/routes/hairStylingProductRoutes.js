const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../intelligence/product/personalCare/hairCare/hairStylingProduct/ocrAndTypeDetection");

router.post(
  "/analyze-hairStylingProduct",

  async(req, res) => {

    try {

      console.log(
        "HAIR STYLING PRODUCT ROUTE HIT"
      );

      const {
        imageBase64
      } = req.body;

      if(!imageBase64) {

        return res.status(400).json({

          success: false,

          message:
            "imageBase64 is required"

        });

      }

      const result =
        await OCRAndTypeDetection.run(
          imageBase64
        );

      return res.json({

        success: true,

        data: result

      });

    }

    catch(error) {

      console.log(
        "HAIR STYLING PRODUCT ROUTE ERROR",
        error.message
      );

      return res.status(500).json({

        success: false,

        message:
          "Hair styling product analysis failed",

        error:
          error.message

      });

    }

  }

);

module.exports =
router;