import mongoose from "mongoose";
const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  storage_type: String,
  common_alternatives: String,
  is_common: { type: Boolean, default: false },
});

export default  mongoose.model('Ingredient', IngredientSchema);
