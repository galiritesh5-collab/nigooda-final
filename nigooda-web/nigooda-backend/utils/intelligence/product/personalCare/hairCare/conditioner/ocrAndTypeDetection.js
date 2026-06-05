
const OpenAI =
require("openai");

const clinicalEngine =
require("./clinical");

const client =
new OpenAI({

  apiKey:
    process.env.OPENAI_API_KEY,

});

/*
=====================================================
EXTRACT INGREDIENTS
=====================================================
*/

async function extractIngredients({

  imageBase64,
  pastedIngredients,

}) {

  /*
  =====================================================
  USER PASTED INGREDIENTS
  =====================================================
  */

  if (
    pastedIngredients &&
    pastedIngredients.trim()
  ) {

    return pastedIngredients
      .split(",")
      .map(item =>
        item.trim()
      )
      .filter(Boolean);

  }

  /*
  =====================================================
  OCR FROM IMAGE
  =====================================================
  */

  if (!imageBase64) {

    throw new Error(
      "No image or ingredients provided"
    );

  }

  const response =
    await client.chat.completions.create({

      model: "gpt-4.1-mini",

      messages: [

        {
          role: "system",

          content: `

You are an OCR ingredient extraction engine.

Extract ONLY cosmetic ingredients.

RULES:

- Return plain text only
- No markdown
- No explanations
- Preserve ingredient order
- Correct OCR spelling mistakes carefully
- Remove non ingredient text
- Separate ingredients using commas only

          `,
        },

        {
          role: "user",

          content: [

            {
              type: "text",

              text:
                "Extract conditioner ingredients from this image"
            },

            {
              type: "image_url",

              image_url: {

                url:
                  imageBase64,

              },

            },

          ],

        },

      ],

      temperature: 0.1,

    });

  const extractedText =
    response
      .choices?.[0]
      ?.message?.content || "";

  return extractedText
    .split(",")
    .map(item =>
      item.trim()
    )
    .filter(Boolean);

}

/*
=====================================================
MAIN RUNNER
=====================================================
*/

async function run({

  imageBase64,
  pastedIngredients,

}) {

  console.log(
    "CONDITIONER OCR ENGINE STARTED"
  );

  /*
  =====================================================
  EXTRACT INGREDIENTS
  =====================================================
  */

  const ingredients =
    await extractIngredients({

      imageBase64,

      pastedIngredients,

    });

  console.log(
    "CONDITIONER INGREDIENTS EXTRACTED"
  );

  /*
  =====================================================
  RUN CLINICAL ENGINE
  =====================================================
  */

  console.log(
    "USING CLINICAL ENGINE"
  );

  const result =
    await clinicalEngine.run({

      ingredients,

    });

  console.log(
    "CONDITIONER ENGINE COMPLETED"
  );

  return result;

}

module.exports = {

  run,

};
