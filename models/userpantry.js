import mongoose from "mongoose";

const UserPantrySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  quantity: { type: Number, required: true },
  unit: String,
  expires_at: Date,
});

export default  mongoose.model('UserPantry', UserPantrySchema);


