import express from "express";
import {
  createFoodItem,
  getAllFoodItems,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem
} from "../controllers/fooditemcontroller.js";
import { protect } from "../upload/authmiddleware.js"; // Optional for admin access

const router = express.Router();

router.post("/", protect, createFoodItem);      // Add food item
router.get("/", getAllFoodItems);              // Get all items (with optional filter)
router.get("/:id", getFoodItemById);           // Get one item
router.put("/:id", protect, updateFoodItem);    // Update
router.delete("/:id", protect, deleteFoodItem); // Delete

export default router;

