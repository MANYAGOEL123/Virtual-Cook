import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructions: String,
  prep_time: Number,
  cook_time: Number,
  difficulty: String,
  servings: Number,
  cuisine_type: String,
  meal_type: String,
});

export default  mongoose.model('Recipe', RecipeSchema);
