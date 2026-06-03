const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/skinCare/dayCream/ocrAndTypeDetection");

router.post(
"/analyze-daycream",

async (
req,
res
) => {

try {

const {
imageBase64,
pastedIngredients
} = req.body;

const result =
await OCRAndTypeDetection.run({

imageBase64,
pastedIngredients

});

return res.json({
success: true,
result
});

}

catch (error) {

console.error(
"DAY CREAM ANALYSIS ERROR:",
error.message
);

return res.status(500).json({

success: false,

message:
"Failed to analyze day cream"

});

}

}
);

module.exports =
router;