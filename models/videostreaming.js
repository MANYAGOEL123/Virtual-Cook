import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true
  },

  uploaderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  videoUrl: {
    type: String,
    required: true
  },

  thumbnailUrl: {
    type: String,
    default: null
  },

  duration: {
    type: Number, // in seconds
    required: true
  },

  views: {
    type: Number,
    default: 0
  },

  description: {
    type: String,
    trim: true
  },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
}, {
  timestamps: {
    createdAt: 'uploadDate',
    updatedAt: 'updatedAt'
  }
});


export default mongoose.model("Video", videoSchema);