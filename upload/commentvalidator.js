import mongoose from "mongoose";

export const validateComment = (req, res, next) => {
  const { entityType, entityId, text } = req.body;

  const allowedTypes = ["recipe", "video"];

  if (!entityType || !allowedTypes.includes(entityType)) {
    return res.status(400).json({ message: "Invalid or missing entityType" });
  }

  if (!entityId || !mongoose.Types.ObjectId.isValid(entityId)) {
    return res.status(400).json({ message: "Invalid or missing entityId" });
  }

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  next();
};
