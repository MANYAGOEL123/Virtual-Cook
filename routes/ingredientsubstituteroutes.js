import express from 'express';
import {
  createIngredientSubstitute,
  getAllIngredientSubstitutes,
  getSubstitutesByIngredient,
  updateIngredientSubstitute,
  deleteIngredientSubstitute,
} from '../controllers/ingredientsubstitutecontroller.js';

const router = express.Router();

router.post('/', createIngredientSubstitute);
router.get('/', getAllIngredientSubstitutes);
router.get('/ingredient/:ingredientId', getSubstitutesByIngredient);
router.put('/:id', updateIngredientSubstitute);
router.delete('/:id', deleteIngredientSubstitute);

export default router;
