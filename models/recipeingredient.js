import mongoose from "mongoose";

const RecipeIngredientSchema = new mongoose.Schema({
  recipe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  quantity: Number,
  unit: String,
  notes: String,
  is_optional: { type: Boolean, default: false },
});

export default mongoose.model('RecipeIngredient', RecipeIngredientSchema);
