import express from 'express';
import {
  createRecipeIngredient,
  getIngredientsByRecipe,
  updateRecipeIngredient,
  deleteRecipeIngredient,
} from '../controllers/recipeingredientcontroller.js';

const router = express.Router();

router.post('/', createRecipeIngredient);
router.get('/recipe/:recipeId', getIngredientsByRecipe);
router.put('/:id', updateRecipeIngredient);
router.delete('/:id', deleteRecipeIngredient);

export default router;
