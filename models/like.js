import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  entityType: {
    type: String,
    enum: ["recipe", "video"],
    required: true
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "entityType"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

export default  mongoose.model("Like", likeSchema);
