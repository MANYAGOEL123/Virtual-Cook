import express from 'express';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipecontroller.js';

const router = express.Router();

router.get('/', getAllRecipes);          // GET /api/recipes
router.get('/:id', getRecipeById);       // GET /api/recipes/:id
router.post('/', createRecipe);          // POST /api/recipes
router.put('/:id', updateRecipe);        // PUT /api/recipes/
router.delete('/:id',deleteRecipe);
export default router;