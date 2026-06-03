const express =
require("express");

const router =
express.Router();

const OCRAndTypeDetection =
require("../utils/intelligence/product/personalCare/skinCare/nightCream/ocrAndTypeDetection");

router.post(
"/analyze-nightcream",

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
"NIGHT CREAM ANALYSIS ERROR:",
error.message
);

return res.status(500).json({

success: false,

message:
"Failed to analyze night cream"

});

}

}
);

module.exports =
router;