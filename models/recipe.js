import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,

  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true }
    }
  ],

  instructions: [String],

  cookingTime: Number, // in minutes
  prepTime: Number,    // in minutes
  servings: Number,

  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  videoIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],

  imageUrl: {
    type: String,
    default: null
  },

  cuisine: {
    type: String,
    trim: true
  },

  dietaryRestrictions: [String], // e.g., ["vegetarian", "gluten-free"]

  nutritionalInfo: {
    calories: Number,
    protein: Number,
    fat: Number,
    carbs: Number
  },

  averageRating: {
    type: Number,
    default: 0
  },

  totalLikes: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});


export default mongoose.model("Recipe", recipeSchema);