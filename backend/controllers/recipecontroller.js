import Recipe from '../models/recipe.js';


export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ totallikes: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).sort({ totallikes: -1 });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body, { authorID: req.user._id });
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create recipe' });
  }
};

export const updateRecipe = async (req, res) => {
  try {

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found"
      });
    }

    if (recipe.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only update your own recipe."
      });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.json(updatedRecipe);

  } catch (error) {
    res.status(400).json({
      error: "Failed to update recipe"
    });
  }
};
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found"
      });
    }

    if (recipe.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own recipe."
      });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
};

