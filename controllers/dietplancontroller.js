import DietPlan from "../models/dietplan.js"; // Adjust path as needed

// ✅ Create a new diet plan
export const createDietPlan = async (req, res) => {
  try {
    const {
      planName,
      description,
      duration,
      targetCalories,
      difficulty
    } = req.body;

    const newPlan = new DietPlan({
      planName,
      description,
      duration,
      targetCalories,
      difficulty,
      creator: req.user._id
    });

    await newPlan.save();
    res.status(201).json({ success: true, dietPlan: newPlan });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get all diet plans (optionally filter by difficulty or user)
export const getAllDietPlans = async (req, res) => {
  try {
    const filters = {};

    if (req.query.difficulty) {
      filters.difficulty = req.query.difficulty;
    }

    if (req.query.creator) {
      filters.creator = req.query.creator;
    }

    const plans = await DietPlan.find(filters).populate("creator", "name email");

    res.status(200).json({ success: true, dietPlans: plans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get a single diet plan by ID
export const getDietPlanById = async (req, res) => {
  try {
    const plan = await DietPlan.findById(req.params.id).populate("creator", "name email");

    if (!plan) {
      return res.status(404).json({ success: false, message: "Diet plan not found" });
    }

    res.status(200).json({ success: true, dietPlan: plan });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update a diet plan
export const updateDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ success: false, message: "Diet plan not found" });
    }

    // Ensure only the creator can update
    if (plan.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const updates = req.body;
    Object.assign(plan, updates);
    await plan.save();

    res.status(200).json({ success: true, dietPlan: plan });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete a diet plan
export const deleteDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ success: false, message: "Diet plan not found" });
    }

    // Ensure only the creator can delete
    if (plan.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await plan.deleteOne();
    res.status(200).json({ success: true, message: "Diet plan deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
