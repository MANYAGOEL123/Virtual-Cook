import mongoose from "mongoose";

const IngredientSubstituteSchema = new mongoose.Schema({
  ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  substitute_ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  substitution_ratio: String,
  notes: String,
});

export default mongoose.model('IngredientSubstitute', IngredientSubstituteSchema);
