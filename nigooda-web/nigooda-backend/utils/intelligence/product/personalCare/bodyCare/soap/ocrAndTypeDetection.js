const openai =
require("../../../../../../ai/openaiClient");

const ClinicalEngine =
require("./clinical");

class OCRAndTypeDetection {

  async run(imageBase64) {

    try {

      console.log(
        "BODY CARE SOAP OCR STARTED"
      );

      const response =
        await openai.chat.completions.create({

          model: "gpt-4o",

          response_format: {
            type: "json_object"
          },

          messages: [

            {
              role: "system",

              content:
                `You are a strict cosmetic ingredient OCR extraction engine.

Return ONLY valid JSON.

Your task:
Extract ONLY the full ingredient list from the product image.

CRITICAL RULES:
- Preserve ingredient order exactly
- Extract ingredients only
- Ignore branding
- Ignore product claims
- Ignore instructions
- Ignore usage directions
- Ignore slogans
- Ignore headings
- Ignore nutritional text
- Ignore marketing language
- Ignore batch codes
- Ignore barcode text
- Ignore manufacturing details
- Fix OCR spelling mistakes carefully
- Preserve scientific ingredient names
- Preserve commas correctly

If ingredients are unclear,
still return best possible cleaned extraction.

JSON FORMAT:

{
  "ingredients": []
}`
            },

            {
              role: "user",

              content: [

                {
                  type: "text",

                  text:
                    "Extract the ingredients from this body care soap product image."
                },

                {
                  type: "image_url",

                  image_url: {
                    url: imageBase64
                  }
                }

              ]
            }

          ]

        });

      const parsed =
        JSON.parse(
          response.choices[0].message.content
        );

      const ingredients =
        parsed.ingredients || [];

      console.log(
        "BODY CARE SOAP INGREDIENTS EXTRACTED"
      );

      return await ClinicalEngine.run(
        ingredients
      );

    }

    catch(error) {

      console.log(
        "BODY CARE SOAP OCR ERROR",
        error.message
      );

      throw error;

    }

  }

}

module.exports =
new OCRAndTypeDetection();