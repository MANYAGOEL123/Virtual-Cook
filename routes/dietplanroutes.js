import express from "express";
import { protect } from "../upload/authmiddleware.js";
import {
  createDietPlan,
  getAllDietPlans,
  getDietPlanById,
  updateDietPlan,
  deleteDietPlan
} from "../controllers/dietplancontroller.js";

const router = express.Router();

router.post("/", protect, createDietPlan);
router.get("/", getAllDietPlans);
router.get("/:id", getDietPlanById);
router.put("/:id", protect, updateDietPlan);
router.delete("/:id", protect, deleteDietPlan);

export default router;
