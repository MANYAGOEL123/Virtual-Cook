import mongoose from "mongoose";

const DietPlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number, // in days
  },
  targetCalories: {
    type: Number,
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // references User model
    required: true,
  },
});

export default  mongoose.model('DietPlan', DietPlanSchema);
