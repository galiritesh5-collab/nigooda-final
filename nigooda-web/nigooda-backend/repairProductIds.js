require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const Product = require("./models/Product");

/* =========================
   CONNECT MONGO
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    repairIds();
  })
  .catch((err) => {
    console.error(err);
  });

/* =========================
   FILE
========================= */

const DATA_FILE = path.join(
  __dirname,
  "data",
  "products.json"
);

/* =========================
   PREFIX MAP
========================= */

const PREFIX_MAP = {
  Food: "f",
  Drinks: "d",
  "Personal Care": "pc",
  Women: "w",
  Men: "m",
  Pets: "pet",
  Kids: "k",
  "Toys & Learning": "t",
  "Baby Care": "b",
  "Fitness & Wellness": "fw",
  "Home, Decor & Kitchen": "h",
  "Electronics & Smart Products": "es",
};

/* =========================
   MAIN
========================= */

async function repairIds() {

  try {

    console.log(
      "Reading products..."
    );

    const raw = fs.readFileSync(
      DATA_FILE,
      "utf8"
    );

    const products =
      JSON.parse(raw);

    /*
      CATEGORY COUNTERS
    */

    const counters = {};

    const updatedProducts =
      products.map((product) => {

        const category =
          product["Primary Category"];

        const prefix =
          PREFIX_MAP[category] || "x";

        if (!counters[prefix]) {
          counters[prefix] = 1;
        }

        const id =
          `${prefix}${counters[prefix]}`;

        console.log(
          product["Name of Product"],
          "→",
          id
        );

        counters[prefix]++;

        product.id = id;

        return product;
      });

    /* =========================
       SAVE JSON
    ========================= */

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(
        updatedProducts,
        null,
        2
      ),
      "utf8"
    );

    console.log(
      "products.json updated"
    );

    /* =========================
       RESET MONGO
    ========================= */

    await Product.deleteMany({});

    await Product.insertMany(
      updatedProducts
    );

    console.log(
      "Mongo updated"
    );

    console.log(
      "✅ IDs repaired successfully"
    );

    process.exit();

  } catch (err) {

    console.error(err);

    process.exit(1);
  }
}