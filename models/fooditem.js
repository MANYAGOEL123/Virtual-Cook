import mongoose from "mongoose";

const FoodItemSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  calories: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  protein: {
    type: mongoose.Types.Decimal128,
    default: 0.0,
  },
  carbohydrates: {
    type: mongoose.Types.Decimal128,
    default: 0.0,
  },
  fats: {
    type: mongoose.Types.Decimal128,
    default: 0.0,
  },
  category: {
    type: String,
    enum: [
      'Vegetables',
      'Fruits',
      'Grains',
      'Proteins',
      'Dairy',
      'Fats/Oils',
      'Sweets',
      'Beverages'
    ],
  },
  servingSize: {
    type: String,
    maxlength: 50,
  },
});

export default  mongoose.model('FoodItem', FoodItemSchema);
