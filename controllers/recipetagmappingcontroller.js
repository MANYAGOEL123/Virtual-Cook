import RecipeTagMapping from '../models/recipetagmapping.js';

// Create new mapping
export const createRecipeTagMapping = async (req, res) => {
  try {
    const newMapping = new RecipeTagMapping(req.body);
    await newMapping.save();
    res.status(201).json(newMapping);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all mappings
export const getAllRecipeTagMappings = async (req, res) => {
  try {
    const mappings = await RecipeTagMapping.find()
      .populate('recipe_id')
      .populate('tag_id');
    res.status(200).json(mappings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tags for a specific recipe
export const getTagsByRecipe = async (req, res) => {
  try {
    const mappings = await RecipeTagMapping.find({ recipe_id: req.params.recipeId })
      .populate('tag_id');
    res.status(200).json(mappings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update mapping
export const updateRecipeTagMapping = async (req, res) => {
  try {
    const updated = await RecipeTagMapping.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete mapping
export const deleteRecipeTagMapping = async (req, res) => {
  try {
    await RecipeTagMapping.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tag mapping deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
