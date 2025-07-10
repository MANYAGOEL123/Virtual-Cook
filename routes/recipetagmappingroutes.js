import express from 'express';
import {
  createRecipeTagMapping,
  getAllRecipeTagMappings,
  getTagsByRecipe,
  updateRecipeTagMapping,
  deleteRecipeTagMapping,
} from '../controllers/recipetagmappingcontroller.js';

const router = express.Router();

router.post('/', createRecipeTagMapping);
router.get('/', getAllRecipeTagMappings);
router.get('/recipe/:recipeId', getTagsByRecipe);
router.put('/:id', updateRecipeTagMapping);
router.delete('/:id', deleteRecipeTagMapping);

export default router;
