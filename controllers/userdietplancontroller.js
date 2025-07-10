import UserDietPlan from '../models/UserDietPlan.js';

export const createUserDietPlan = async (req, res) => {
  try {
    const newPlan = new UserDietPlan(req.body);
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserDietPlans = async (req, res) => {
  try {
    const plans = await UserDietPlan.find({ userId: req.params.userId }).populate('planId');
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserDietPlan = async (req, res) => {
  try {
    const updatedPlan = await UserDietPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUserDietPlan = async (req, res) => {
  try {
    await UserDietPlan.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Diet plan deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
