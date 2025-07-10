import RecipeIngredient from '../models/recipeingredient.js';

// Create a new recipe ingredient
export const createRecipeIngredient = async (req, res) => {
  try {
    const newItem = new RecipeIngredient(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all ingredients for a specific recipe
export const getIngredientsByRecipe = async (req, res) => {
  try {
    const ingredients = await RecipeIngredient.find({ recipe_id: req.params.recipeId })
      .populate('ingredient_id');
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a recipe ingredient
export const updateRecipeIngredient = async (req, res) => {
  try {
    const updated = await RecipeIngredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a recipe ingredient
export const deleteRecipeIngredient = async (req, res) => {
  try {
    await RecipeIngredient.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Recipe ingredient deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
