const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model(
  "Product",
  ProductSchema
);