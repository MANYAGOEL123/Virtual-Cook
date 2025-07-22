import mongoose from "mongoose";

const RecipeTagMappingSchema = new mongoose.Schema({
  recipe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  tag_id: { type: mongoose.Schema.Types.ObjectId, ref: 'RecipeTag', required: true },
});

export default  mongoose.model('RecipeTagMapping', RecipeTagMappingSchema);