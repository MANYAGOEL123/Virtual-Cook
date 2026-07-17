import express from 'express';
import { protect } from '../upload/authmiddleware.js';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipecontroller.js';

const router = express.Router();

router.get('/', getAllRecipes);         
router.get('/:id', getRecipeById);       
router.post('/',protect, createRecipe);          
router.put('/:id', protect, updateRecipe);        
router.delete('/:id', protect, deleteRecipe);
export default router;