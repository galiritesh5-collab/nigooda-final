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
    syncProducts();
  })
  .catch((err) => {
    console.error("Mongo Error:", err);
  });

/* =========================
   PRODUCTS FILE
========================= */

const DATA_FILE = path.join(
  __dirname,
  "data",
  "products.json"
);

/* =========================
   MAIN SYNC
========================= */

async function syncProducts() {

  try {

    console.log(
      "Reading products.json..."
    );

    const raw = fs.readFileSync(
      DATA_FILE,
      "utf8"
    );

    const products =
      JSON.parse(raw);

    console.log(
      `Found ${products.length} products`
    );

    /* =========================
       DELETE OLD PRODUCTS
    ========================= */

    console.log(
      "Deleting old Mongo products..."
    );

    await Product.deleteMany({});

    /* =========================
       INSERT NEW PRODUCTS
    ========================= */

    console.log(
      "Inserting products..."
    );

    await Product.insertMany(products);

    console.log(
      "✅ Products synced successfully"
    );

    process.exit();

  } catch (err) {

    console.error(
      "SYNC ERROR:",
      err
    );

    process.exit(1);
  }
}