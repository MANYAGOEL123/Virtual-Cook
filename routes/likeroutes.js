import express from "express";
import { protect } from "../upload/authmiddleware.js";
import {
  addLike,
  removeLike,
  getLikes,
  hasUserLiked
} from "../controllers/likecontroller.js";

const router = express.Router();

// POST /likes - like an entity
router.post("/", protect, addLike);

// DELETE /likes - unlike (pass entityType & entityId in body)
router.delete("/", protect, removeLike);

// GET /likes/:entityType/:entityId - get all likes for recipe or video
router.get("/:entityType/:entityId", getLikes);

// GET /likes/check/:entityType/:entityId - check if user liked (optional)
router.get("/check/:entityType/:entityId", protect, hasUserLiked);

export default router;
