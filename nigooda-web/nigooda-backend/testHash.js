const generateHash =
require("./engine/hashGenerator");

const ingredients1 = [
  "potato",
  "salt",
  "palmolein oil"
];

const ingredients2 = [
  "salt",
  "potato",
  "palmolein oil"
];

const hash1 =
generateHash(ingredients1);

const hash2 =
generateHash(ingredients2);

console.log("Hash 1:", hash1);
console.log("Hash 2:", hash2);

console.log(
  "Hashes match:",
  hash1 === hash2
);