import express from "express";
import { protect } from "../upload/authmiddleware.js";
import {
  addLike,
  removeLike,
  getLikes,
  hasUserLiked
} from "../controllers/likecontroller.js";

const router = express.Router();


router.post("/", protect, addLike);


router.delete("/", protect, removeLike);


router.get("/:entityType/:entityId", getLikes);


router.get("/check/:entityType/:entityId", protect, hasUserLiked);

export default router;
