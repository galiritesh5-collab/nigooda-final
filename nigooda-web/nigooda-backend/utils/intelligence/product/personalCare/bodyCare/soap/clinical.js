const openai =
require("../../../../../../ai/openaiClient");

class ClinicalEngine {

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

================================================
PASTE YOUR ALGORITHM PROMPT HERE
================================================




























































































































































































================================================

INGREDIENTS

${ingredients.join(", ")}

`;

    const response =
      await openai.chat.completions.create({

        model: "gpt-5.4-mini",

        temperature: 0.2,

        messages: [

          {
            role: "system",

            content:
              "You are a strict body care soap formulation evaluation engine. Always return professional markdown analysis."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    return response
      .choices[0]
      .message
      .content;

  }

  async run(
    ingredients
  ) {

    try {

      console.log(
        "BODY CARE SOAP CLINICAL ANALYSIS STARTED"
      );

      const analysis =
        await this.generateAnalysis(
          ingredients
        );

      return {

        product_type:
          "CLINICAL",

        ingredients,

        analysis

      };

    }

    catch(error) {

      console.log(
        "BODY CARE SOAP CLINICAL ERROR",
        error.message
      );

      throw error;

    }

  }

}

module.exports =
new ClinicalEngine();