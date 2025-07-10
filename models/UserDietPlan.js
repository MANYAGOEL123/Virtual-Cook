import mongoose from 'mongoose';

const UserDietPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DietPlan',
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Paused', 'Abandoned'],
    default: 'Active',
  },
  progress: {
    type: Number, // percentage
    min: 0,
    max: 100,
  },
}, {
  timestamps: true
  });

const UserDietPlan = mongoose.model("UserDietPlan", UserDietPlanSchema);
export default UserDietPlan;

