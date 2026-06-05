const openai =
require("../../../../../../ai/openaiClient");

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

      return await ClinicalEngine.run(
        extractedData
      );

    }

    catch (error) {

      console.error(
        "HAIRCARE OCR ERROR:",
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
You are a haircare OCR engine.

TASKS:

1. Extract ONLY ingredients.
2. Preserve ingredient order.
3. Remove marketing text.
4. Clean OCR mistakes.

Return ONLY valid JSON.

OUTPUT:

{
  "ingredients": [
    "Water",
    "Sodium Laureth Sulfate",
    "Cocamidopropyl Betaine"
  ]
}
`
          },

          {
            role: "user",

            content: [

              {
                type: "text",

                text:
                  "Extract haircare ingredients."
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

    console.log(
      "HAIRCARE OCR TOKEN USAGE:",
      response.usage
    );

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
You are a haircare ingredient cleaning engine.

TASKS:

1. Clean ingredients.
2. Preserve ingredient order.
3. Remove duplicates.
4. Fix OCR mistakes.

Return ONLY valid JSON.

OUTPUT:

{
  "ingredients": [
    "Water",
    "Sodium Laureth Sulfate",
    "Cocamidopropyl Betaine"
  ]
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
      "HAIRCARE CLEAN TOKEN USAGE:",
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