import express from 'express';
import {
  createPlanFoodItem,
  getPlanFoodItemsByPlan,
  updatePlanFoodItem,
  deletePlanFoodItem,
} from '../controllers/planfooditemcontroller.js';

const router = express.Router();

router.post('/', createPlanFoodItem);
router.get('/:planId', getPlanFoodItemsByPlan);
router.put('/:id', updatePlanFoodItem);
router.delete('/:id', deletePlanFoodItem);

export default router;
