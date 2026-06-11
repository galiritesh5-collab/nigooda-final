const express =
require("express");

const router =
express.Router();

/*
=====================================================
BABY LOTION ANALYSIS ROUTE
=====================================================
*/

router.post(

  "/analyze-babyLotion",

  async (req, res) => {

    try {

      console.log(
        "BABY LOTION ROUTE HIT"
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
      PLACEHOLDER RESPONSE
      =============================================
      */

      return res.json({

        success: true,

        result: {

          babycare_type:
            "CLINICAL",

          message:
            "Baby Lotion engine not implemented yet."

        }

      });

    }

    catch (error) {

      console.error(
        "BABY LOTION ANALYSIS ERROR:",
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