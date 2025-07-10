import mongoose from 'mongoose';

const planFoodItemSchema = new mongoose.Schema({
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DietPlan',
    required: true,
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodItem',
    required: true,
  },
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    required: true,
  },
  dayOfWeek: {
    type: String,
    enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Any'],
    default: 'Any',
  },
  servingSize: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

const PlanFoodItem = mongoose.model('PlanFoodItem', planFoodItemSchema);

export default PlanFoodItem;

