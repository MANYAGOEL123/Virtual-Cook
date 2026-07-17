import Ingredient from '../models/ingredient.js';


export const createIngredient = async (req, res) => {
  try {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    res.status(200).json(ingredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateIngredient = async (req, res) => {
  try {
    const updated = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const deleteIngredient = async (req, res) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Ingredient deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
