require("dotenv").config();

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Product = require("./models/Product");

const DATA_FILE = path.join(
  __dirname,
  "data",
  "products.json"
);

async function importProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const raw = fs.readFileSync(DATA_FILE, "utf8");

    const products = JSON.parse(raw);

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(
      `Imported ${products.length} products`
    );

    process.exit();

  } catch (err) {

    console.error(err);

    process.exit(1);
  }
}

importProducts();