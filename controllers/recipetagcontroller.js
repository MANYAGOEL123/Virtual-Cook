import RecipeTag from '../models/recipetag.js';

// Create a new tag
export const createRecipeTag = async (req, res) => {
  try {
    const newTag = new RecipeTag(req.body);
    await newTag.save();
    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all tags
export const getAllRecipeTags = async (req, res) => {
  try {
    const tags = await RecipeTag.find();
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single tag by ID
export const getRecipeTagById = async (req, res) => {
  try {
    const tag = await RecipeTag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a tag
export const updateRecipeTag = async (req, res) => {
  try {
    const updated = await RecipeTag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a tag
export const deleteRecipeTag = async (req, res) => {
  try {
    await RecipeTag.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
