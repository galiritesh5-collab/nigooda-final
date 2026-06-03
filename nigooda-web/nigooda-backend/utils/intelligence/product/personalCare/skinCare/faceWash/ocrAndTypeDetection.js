const openai =
require("../../../../../../ai/openaiClient");

const OrganicEngine =
require("./organic");

const ClinicalEngine =
require("./clinical");

class OCRAndTypeDetection {

  async run({
    imageBase64,
    pastedIngredients,
  }) {

    try {

      let extractedData;

      if (imageBase64) {

        extractedData =
          await this.extractFromImage(
            imageBase64
          );

      }

      else if (pastedIngredients) {

        extractedData =
          await this.detectFromText(
            pastedIngredients
          );

      }

      else {

        throw new Error(
          "No ingredients input provided."
        );

      }

      if (
        extractedData.type ===
        "ORGANIC_HERBAL"
      ) {

        return await OrganicEngine.run(
          extractedData
        );

      }

      if (
        extractedData.type ===
        "CLINICAL_CHEMICAL"
      ) {

        return await ClinicalEngine.run(
          extractedData
        );

      }

      throw new Error(
        "Invalid cleanser type."
      );

    }

    catch (error) {

      console.error(
        "OCR + TYPE DETECTION ERROR:",
        error.message
      );

      throw error;

    }

  }

  async extractFromImage(
    imageBase64
  ) {

    const response =
      await openai.chat.completions.create({

        model: "gpt-4o",

        temperature: 0,

        response_format: {
          type: "json_object"
        },

        messages: [
          {
            role: "system",

            content: `
You are a skincare OCR and cleanser classification engine.

TASKS:

1. Extract ONLY ingredients.
2. Preserve ingredient order.
3. Detect cleanser type.

CLASSIFY ONLY:

- ORGANIC_HERBAL
- CLINICAL_CHEMICAL

Return ONLY valid JSON.

OUTPUT:

{
  "ingredients": [
    "Water",
    "Glycerin"
  ],
  "type": "ORGANIC_HERBAL"
}
`
          },

          {
            role: "user",

            content: [
              {
                type: "text",

                text:
                  "Extract ingredients and classify cleanser type."
              },

              {
                type: "image_url",

                image_url: {
                  url:
                    imageBase64
                }
              }
            ]
          }
        ]
      });

    const parsed =
      JSON.parse(
        response.choices[0]
          .message.content
      );

    return parsed;

  }

  async detectFromText(
    pastedIngredients
  ) {

    const response =
      await openai.chat.completions.create({

        model: "gpt-4o",

        temperature: 0,

        response_format: {
          type: "json_object"
        },

        messages: [
          {
            role: "system",

            content: `
You are a cleanser classification engine.

TASKS:

1. Clean ingredients.
2. Detect cleanser type.

CLASSIFY ONLY:

- ORGANIC_HERBAL
- CLINICAL_CHEMICAL

Return ONLY valid JSON.

OUTPUT:

{
  "ingredients": [
    "Water",
    "Glycerin"
  ],
  "type": "CLINICAL_CHEMICAL"
}
`
          },

          {
            role: "user",

            content:
              pastedIngredients
          }
        ]
      });

    const parsed =
      JSON.parse(
        response.choices[0]
          .message.content
      );
   console.log(
  "ocr TOKEN USAGE:",
  response.usage
);
    return parsed;

  }

}

module.exports =
new OCRAndTypeDetection();