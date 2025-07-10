import mongoose from "mongoose";
const RecipeTagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export default  mongoose.model('RecipeTag', RecipeTagSchema);
