import express from 'express';
import {
  createRecipeTag,
  getAllRecipeTags,
  getRecipeTagById,
  updateRecipeTag,
  deleteRecipeTag,
} from '../controllers/recipetagcontroller.js';

const router = express.Router();

router.post('/', createRecipeTag);
router.get('/', getAllRecipeTags);
router.get('/:id', getRecipeTagById);
router.put('/:id', updateRecipeTag);
router.delete('/:id', deleteRecipeTag);

export default router;
