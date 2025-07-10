import express from "express";
import { createComment, getCommentsByEntity, deleteComment } from "../controllers/commentcontroller.js";
import { protect } from "../upload/authmiddleware.js";
import { validateComment } from "../upload/commentvalidator.js";

const router = express.Router();

// Add a comment
router.post("/", protect, validateComment, createComment);

// Get all comments for a recipe or video
router.get("/:entityType/:entityId", getCommentsByEntity);

// Delete a comment
router.delete("/:id", protect, deleteComment);

export default router;
