import PlanFoodItem from '../models/planfooditem.js';

export const createPlanFoodItem = async (req, res) => {
  try {
    const newItem = new PlanFoodItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPlanFoodItemsByPlan = async (req, res) => {
  try {
    const items = await PlanFoodItem.find({ planId: req.params.planId }).populate('foodId');
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePlanFoodItem = async (req, res) => {
  try {
    const updatedItem = await PlanFoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePlanFoodItem = async (req, res) => {
  try {
    await PlanFoodItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Food item in plan deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
