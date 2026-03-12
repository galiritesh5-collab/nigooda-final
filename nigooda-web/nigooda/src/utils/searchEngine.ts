export const normalize = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9% ]/g, "");

const synonymMap: Record<string, string[]> = {
  dark: ["70%", "75%", "80%", "85%", "90%", "cocoa", "dark chocolate"],
};

const getSynonyms = (word: string) => synonymMap[word] || [];

const levenshtein = (a: string, b: string) => {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);

  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
    }
  }

  return matrix[b.length][a.length];
};

export const searchProducts = (products: any[], query: string) => {
  const terms = normalize(query).split(" ").filter(Boolean);

  return products
    .map((product) => {
      const text = normalize(
        product.name + " " + product.tags.join(" ")
      );

      let score = 0;

      terms.forEach((term) => {
        if (text.includes(term)) score += 5;

        getSynonyms(term).forEach((syn) => {
          if (text.includes(syn)) score += 3;
        });

        text.split(" ").forEach((word: string) => {
          if (levenshtein(word, term) === 1) score += 2;
        });

        if (normalize(product.name).includes(term)) score += 8;
      });

      return { product, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((p) => p.product);
};