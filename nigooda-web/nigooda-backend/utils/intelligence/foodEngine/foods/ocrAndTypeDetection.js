const openai = require("../../../../ai/openaiClient");

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
        "EXTRACTED FOOD DATA:",
        extractedData
      );

      return await ClinicalEngine.run(
        extractedData
      );

    }

    catch (error) {

      console.error(
        "FOOD OCR ERROR:",
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
You are a Food OCR engine.

TASKS:
1. Extract ONLY ingredients.
2. Preserve ingredient order exactly.
3. Preserve percentages exactly if present.
4. Preserve INS numbers exactly.
5. Preserve E-number formatting exactly.
6. Remove marketing text.
7. Remove duplicate ingredients.
8. Correct OCR mistakes safely.
9. Do NOT hallucinate ingredients.

Return ONLY valid JSON.

OUTPUT:
{
  "ingredients": [
    "Oats",
    "Palm Oil",
    "Sugar"
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
                  "Extract food ingredients."
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
      "FOOD OCR TOKEN USAGE:",
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
You are a Food ingredient cleaning engine.

TASKS:
1. Clean ingredient lists.
2. Preserve ingredient order exactly.
3. Preserve percentages exactly.
4. Preserve INS numbers exactly.
5. Preserve E-number formatting exactly.
6. Preserve flavor labeling exactly.
7. Remove duplicate ingredients.
8. Fix OCR mistakes safely.
9. Do NOT rewrite ingredients.
10. Do NOT summarize ingredients.

Return ONLY valid JSON.

OUTPUT:
{
  "ingredients": [
    "Oats",
    "Palm Oil",
    "Sugar"
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
      "FOOD OCR TOKEN USAGE:",
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
