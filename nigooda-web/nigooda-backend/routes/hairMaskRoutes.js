const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../intelligence/product/personalCare/hairCare/hairMask/ocrAndTypeDetection");

router.post(
  "/analyze-hairMask",

  async(req, res) => {

    try {

      console.log(
        "HAIR MASK ROUTE HIT"
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
        "HAIR MASK ROUTE ERROR",
        error.message
      );

      return res.status(500).json({

        success: false,

        message:
          "Hair mask analysis failed",

        error:
          error.message

      });

    }

  }

);

module.exports =
router;