import express from "express";
import {
  createFoodItem,
  getAllFoodItems,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem
} from "../controllers/fooditemcontroller.js";
import { protect } from "../upload/authmiddleware.js"; 
import {athorize} from "../upload/authorize.js"
const router = express.Router();

router.post("/", protect,authorize("admin"), createFoodItem);      
router.get("/", getAllFoodItems);             
router.get("/:id", getFoodItemById);           
router.put("/:id", protect,authorize("admin"), updateFoodItem);    
router.delete("/:id", protect, authorize("admin"), deleteFoodItem);

export default router;

