const mongoose = require("mongoose");

const schema = {
  Name: { type: String, required: true },
  Category: { type: String, required: true },
  Instruction: { type: String, required: true },
  ThumbImg: { type: String },
  Tags: [String],
  Video: { type: String },
  Ingredients: { type: [String], required: true },
  Measurements: { type: [String], required: true },
  Source: String,
  DateModified: { type: Date, default: Date.now }
};

const recipeSchema = new mongoose.Schema(schema);
const savedSchema = new mongoose.Schema({
  ...schema,
  UserId: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
  Name: { type: String }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
const SavedRecipe = mongoose.model("savedRecipe", savedSchema);
const User = mongoose.model("users", UserSchema);

module.exports = { Recipe, User, SavedRecipe };
