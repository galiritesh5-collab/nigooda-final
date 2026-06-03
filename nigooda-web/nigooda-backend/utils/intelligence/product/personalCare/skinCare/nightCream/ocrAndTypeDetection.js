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
        "DETECTED NIGHT CREAM TYPE:",
        extractedData.type
      );

      const detectedType =
        String(
          extractedData.type || ""
        )
        .trim()
        .toUpperCase();

      if (

        detectedType.includes(
          "ORGANIC"
        )

        ||

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
        )

        ||

        detectedType.includes(
          "CHEMICAL"
        )

      ) {

        return await ClinicalEngine.run(
          extractedData
        );

      }

      console.log(
        "INVALID TYPE RESPONSE:",
        extractedData
      );

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
You are a skincare OCR and night cream classification engine.

TASKS:

1. Extract ONLY ingredients.
2. Preserve ingredient order.
3. Detect night cream type.

CLASSIFY ONLY:

- ORGANIC_HERBAL
- CLINICAL_CHEMICAL

IMPORTANT:

- Retinol
- Peptides
- Ceramides
- Niacinamide
- Acids
- Lab-created actives
- Silicone systems

= CLINICAL_CHEMICAL

Natural oils
Plant extracts
Ayurvedic herbs
Botanical systems
Essential oils

= ORGANIC_HERBAL

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

            content: [
              {
                type: "text",

                text:
                  "Extract ingredients and classify night cream type."
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
You are a night cream classification engine.

TASKS:

1. Clean ingredients.
2. Detect night cream type.

CLASSIFY ONLY:

- ORGANIC_HERBAL
- CLINICAL_CHEMICAL

IMPORTANT:

- Retinol
- Peptides
- Ceramides
- Niacinamide
- Acids
- Silicone systems
- Dermatological actives

= CLINICAL_CHEMICAL

Natural oils
Plant extracts
Ayurvedic herbs
Botanical systems
Essential oils

= ORGANIC_HERBAL

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

    console.log(
      "NIGHT CREAM OCR TOKEN USAGE:",
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