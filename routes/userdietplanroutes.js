import express from 'express';
import {
  createUserDietPlan,
  getUserDietPlans,
  updateUserDietPlan,
  deleteUserDietPlan
} from '../controllers/userdietplancontroller.js';

const router = express.Router();

router.post('/', createUserDietPlan);
router.get('/:userId', getUserDietPlans);
router.put('/:id', updateUserDietPlan);
router.delete('/:id', deleteUserDietPlan);

export default router;
