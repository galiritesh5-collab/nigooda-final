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

      // SEND FULL OBJECT
      return await ClinicalEngine.run(
        extractedData
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
You are a Moisturizer OCR engine.

TASKS:
1. Extract ONLY ingredients.
2. Preserve ingredient order.
3. Preserve percentages, units, and concentration formatting exactly if they exist.
4. Remove marketing text and garbage OCR text.
5. Remove duplicate ingredients.
6. Correct OCR mistakes safely.

Return ONLY valid JSON.

OUTPUT:
{
  "ingredients": [
    "Water",
    "Glycerin"
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
                  "Extract ingredients."
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
      "OCR TOKEN USAGE:",
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
You are a Moisturizer ingredient cleaning engine.

TASKS:
1. Clean ingredients.
2. Preserve ingredient order.
3. Preserve percentages, units, and concentration formatting exactly if they exist.
4. Remove duplicates.
5. Fix OCR mistakes.

Return ONLY valid JSON.

OUTPUT:
{
  "ingredients": [
    "Water",
    "Glycerin"
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
      "CLEAN TOKEN USAGE:",
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