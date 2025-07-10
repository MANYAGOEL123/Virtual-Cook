import IngredientSubstitute from '../models/ingredientsubstitute.js';

// Create a new substitute
export const createIngredientSubstitute = async (req, res) => {
  try {
    const newSubstitute = new IngredientSubstitute(req.body);
    await newSubstitute.save();
    res.status(201).json(newSubstitute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all substitutes
export const getAllIngredientSubstitutes = async (req, res) => {
  try {
    const substitutes = await IngredientSubstitute.find()
      .populate('ingredient_id')
      .populate('substitute_ingredient_id');
    res.status(200).json(substitutes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get substitutes for a specific ingredient
export const getSubstitutesByIngredient = async (req, res) => {
  try {
    const substitutes = await IngredientSubstitute.find({ ingredient_id: req.params.ingredientId })
      .populate('substitute_ingredient_id');
    res.status(200).json(substitutes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a substitute
export const updateIngredientSubstitute = async (req, res) => {
  try {
    const updated = await IngredientSubstitute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a substitute
export const deleteIngredientSubstitute = async (req, res) => {
  try {
    await IngredientSubstitute.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Ingredient substitute deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
