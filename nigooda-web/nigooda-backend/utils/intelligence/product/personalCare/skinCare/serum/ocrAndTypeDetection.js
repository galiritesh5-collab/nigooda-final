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

      console.log(
        "EXTRACTED DATA:",
        extractedData
      );

      const detectedType =
        String(
          extractedData.type || ""
        )
          .trim()
          .toUpperCase();

      console.log(
        "DETECTED TYPE:",
        detectedType
      );

      if (
        detectedType.includes(
          "ORGANIC"
        ) ||
        detectedType.includes(
          "HERBAL"
        )
      ) {

        return await OrganicEngine.run(
          extractedData
        );

      }

      if (
        detectedType.includes(
          "CLINICAL"
        ) ||
        detectedType.includes(
          "CHEMICAL"
        )
      ) {

        return await ClinicalEngine.run(
          extractedData
        );

      }

      throw new Error(
        "Invalid serum type."
      );

    }

    catch (error) {

      console.error(
        "OCR + SERUM ERROR:",
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
You are a skincare OCR and serum classification engine.

TASKS:

1. Extract ONLY ingredients.
2. Preserve ingredient order.
3. Detect serum type.

CLASSIFY ONLY:

- ORGANIC_HERBAL
- CLINICAL_CHEMICAL

Return ONLY valid JSON.

OUTPUT:

{
  "ingredients": [
    "Water",
    "Niacinamide"
  ],
  "type": "CLINICAL_CHEMICAL"
}
`
          },

          {
            role: "user",

            content: [
              {
                type: "text",

                text:
                  "Extract ingredients and classify serum type."
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

    return JSON.parse(
      response.choices[0]
        .message.content
    );

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
You are a serum classification engine.

TASKS:

1. Clean ingredients.
2. Detect serum type.

CLASSIFY ONLY:

- ORGANIC_HERBAL
- CLINICAL_CHEMICAL

Return ONLY valid JSON.

OUTPUT:

{
  "ingredients": [
    "Water",
    "Niacinamide"
  ],
  "type": "ORGANIC_HERBAL"
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

    console.log(
      "SERUM OCR TOKEN USAGE:",
      response.usage
    );

    return JSON.parse(
      response.choices[0]
        .message.content
    );

  }

}

module.exports =
new OCRAndTypeDetection();