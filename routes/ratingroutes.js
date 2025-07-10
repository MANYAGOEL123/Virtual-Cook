import express from "express";
import { protect } from "../upload/authmiddleware.js";
import {
  addOrUpdateRating,
  getRatings,
  getAverageRating,
  deleteRating
} from "../controllers/ratingcontroller.js";

const router = express.Router();

router.post("/", protect, addOrUpdateRating);
router.delete("/", protect, deleteRating);
router.get("/:entityType/:entityId", getRatings);
router.get("/average/:entityType/:entityId", getAverageRating);

export default router;
