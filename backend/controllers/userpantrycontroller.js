import UserPantry from '../models/userpantry.js';


export const createUserPantryItem = async (req, res) => {
  try {
    const newItem = new UserPantry(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getUserPantryItems = async (req, res) => {
  try {
    const items = await UserPantry.find({ user_id: req.params.userId }).populate('ingredient_id');
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateUserPantryItem = async (req, res) => {
  try {
    const updated = await UserPantry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const deleteUserPantryItem = async (req, res) => {
  try {
    await UserPantry.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pantry item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
