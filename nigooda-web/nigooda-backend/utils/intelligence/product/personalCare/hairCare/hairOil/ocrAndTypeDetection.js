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
        "HAIR OIL OCR ERROR:",
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
You are a HairOil OCR engine.

TASKS:
1. Extract ONLY ingredients.
2. Preserve ingredient order.
3. Preserve percentages, units, and concentration formatting exactly if they exist (e.g., "Aloe Vera 5%", "Tea Tree Oil 2%", "Niacinamide 10%", "Chlorhexidine 0.3% w/v"). Do NOT remove percentages, estimate percentages, alter units, or split percentages away from ingredients.
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
      "EXTRACTED DATA:",
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
You are a HairOil ingredient cleaning engine.

TASKS:
1. Clean ingredients.
2. Preserve ingredient order.
3. Preserve percentages, units, and concentration formatting exactly if they exist (e.g., "Aloe Vera 5%", "Tea Tree Oil 2%", "Niacinamide 10%", "Chlorhexidine 0.3% w/v"). Do NOT remove percentages, estimate percentages, alter units, or split percentages away from ingredients.
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
      "HAIR OIL OCR TOKEN USAGE:",
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
