const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
  },
  {
    strict: false, // allows any field to be stored
  }
);

// FIX: Add indexes for performance and uniqueness
ProductSchema.index({ id: 1 }, { unique: true });
ProductSchema.index({ isNewLaunch: 1 });
ProductSchema.index({ isTrending: 1 });
ProductSchema.index({ isBestForDailyUse: 1 });
ProductSchema.index({ isUnderrated: 1 });
ProductSchema.index({ "Primary Category": 1 });
ProductSchema.index({ "Sub-Category": 1 });

module.exports = mongoose.model("Product", ProductSchema);
