const openai =
require("../../../../../../ai/openaiClient");

const ClinicalEngine =
require("./clinical");

class OCRAndTypeDetection {

  async run(imageBase64) {

    try {

      console.log(
        "HAIR MASK OCR STARTED"
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
                `You are a professional OCR extraction engine.

Return ONLY valid JSON.

Extract ONLY the ingredient list from the product label.

Rules:
- Preserve ingredient order
- Remove marketing text
- Remove instructions
- Remove claims
- Remove usage text
- Remove headings
- Fix OCR spelling mistakes
- Return ingredients as array

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
                    "Extract the ingredients from this hair mask product image."
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
        "HAIR MASK INGREDIENTS EXTRACTED"
      );

      return await ClinicalEngine.run(
        ingredients
      );

    }

    catch(error) {

      console.log(
        "HAIR MASK OCR ERROR",
        error.message
      );

      throw error;

    }

  }

}

module.exports =
new OCRAndTypeDetection();