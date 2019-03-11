const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Category: { type: String, required: true },
  Instruction: { type: String, required: true },
  ThumbImg: { type: String },
  Tags: [String],
  Video: { type: String },
  Ingredients: { type: [String], required: true },
  Measurements: { type: [String], required: true },
  Source: String,
  DateModified: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recipe", recipeSchema);
